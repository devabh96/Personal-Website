module.exports = function (fastify) {
  fastify.get("/hi", (request, reply) => {
    reply.send("Hii");
  });
};
