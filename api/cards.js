const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  link: String,
});
const db = mongoose.connection.useDb("cardsDB");
const Card = db.model("Card", cardSchema, "cards");
module.exports = function (fastify) {
  fastify.get("/cards", async (request, reply) => {
    try {
      const cards = await Card.find();
      return cards;
    } catch (err) {
      fastify.log.error(err);
      reply.status(500).send({ message: "Error fetching cards" });
    }
  });
};
