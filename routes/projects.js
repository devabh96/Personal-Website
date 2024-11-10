module.exports = function (fastify) {
  fastify.get("/projects", (request, reply) => {
    reply.sendFile("/html/projects.html");
  });
};
