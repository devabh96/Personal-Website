require('dotenv').config();
const fastify = require('fastify')({
  logger: true
});
const fastifyStatic = require('@fastify/static');
const path = require('path');
const fs = require('fs');
const routesPath = path.join(__dirname, 'routes');
const mongoose = require('mongoose');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

fs.readdirSync(routesPath).forEach((file) => {
  const route = require(path.join(routesPath, file));
  fastify.register(route);
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).sendFile('/html/404.html', path.join(__dirname, 'public'));
});







client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.BOT_TOKEN);
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Successfully connected to the database")
}).catch((err) =>{
  console.error("Error while connecting",err)
})
fastify.listen({ port: process.env.PORT, host: process.env.HOST }, (err, address) => {
  if (err) throw err
})