module.exports = function (fastify) {
    fastify.get("/cute", (request, reply) => {
        reply.redirect(
            "https://youtu.be/dQw4w9WgXcQ?si=Z2pyOB-B4AR2p2Jo", 301
        );
    });
};
