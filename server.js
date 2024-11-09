require("dotenv").config();
const fastify = require("fastify")({
  logger: true,
});
const fastifyStatic = require("@fastify/static");
const path = require("path");
const fs = require("fs");
const routesPath = path.join(__dirname, "routes");
const mongoose = require("mongoose");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const apiPath = path.join(__dirname, "api");
client.login(process.env.BOT_TOKEN);

fs.readdirSync(apiPath).forEach((file) => {
  const ep = require(path.join(apiPath, file));
  fastify.register(ep, { prefix: "/api" });
});
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(path.join(routesPath, file));
  fastify.register(route);
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).sendFile("/html/404.html", path.join(__dirname, "public"));
});

async function mongooseConnect() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      client.channels.cache.get(process.env.CHANNEL).send({
        content: "Connected to the database sucessfully",
      });
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.error("Error while connecting", err);
    });
}
async function fastifyConnect() {
  await fastify.listen(
    {
      port: process.env.PORT,
      host: process.env.HOST,
    },
    (err, address) => {
      if (err)
        client.channels.cache.get(process.env.CHANNEL).send({
          content: "err",
        });
      else
        client.channels.cache.get(process.env.CHANNEL).send({
          content: "Fastify is up",
        });
    }
  );
}
client.once("ready", async () => {
  client.channels.cache.get(process.env.CHANNEL).send({
    content: "Bot is ready",
  });
  console.log(`Logged in as ${client.user.tag}!`);
  await mongooseConnect();
  await fastifyConnect();
});
