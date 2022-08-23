import * as path from 'path'
import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
const server = fastify()

server.register(fastifySwagger, {
    routePrefix: '/swagger',
    swagger: {
        info: {
            title: 'Blocktrust API Service',
            description: 'Blocktrust Backend Application',
            version: '0.1.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true
})

server.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/'
})

server.get("/", async (request, reply) => {
    // reply.redirect('index.html')
    reply.send('Welcome!')
})

server.get("/api/ping", async (request, reply) => {
    reply.send({ping: 'pong'})
})

server.listen({port: 3000, host: "0.0.0.0"}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
