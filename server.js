require('dotenv').config();
const fastify = require('fastify')({
  logger: true
});
const fastifyStatic = require('@fastify/static');
const path = require('path');
const fs = require('fs');
const routesPath = path.join(__dirname, 'routes');


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




fastify.listen({ port: process.env.PORT }, (err, address) => {
  if (err) throw err
})