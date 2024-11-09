module.exports = function (fastify) {
  fastify.get("/", (request, reply) => {
    reply.send("This is an api");
  });
};
