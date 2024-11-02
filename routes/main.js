module.exports = function(fastify){
  fastify.get('/', (request, reply) => {
  reply.sendFile('/html/index.html')
})
}