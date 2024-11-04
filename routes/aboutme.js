module.exports = function(fastify){
  fastify.get('/about-me', (request, reply) => {
  reply.sendFile('/html/aboutme.html')
})
}
