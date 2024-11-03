module.exports = function(fastify){
  fastify.get('/contact-me', (request, reply) => {
  reply.sendFile('/html/contactme.html')
})
}