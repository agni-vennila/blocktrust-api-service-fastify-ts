import * as path from 'path'
import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifySwagger from '@fastify/swagger'
import fastifyPrismaClient from "fastify-prisma-client";

const app = fastify()

app.register(fastifySwagger, {
    routePrefix: '/swagger',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'Blocktrust API Service',
            description: 'Blocktrust Backend Application',
            version: '0.0.1'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost:3000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    }
})

app.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/'
})

app.register(fastifyPrismaClient)

app.get("/", async (req, res) => {
    // res.redirect('index.html')
    res.send('Welcome!')
})

app.get("/api/ping", async (req, res) => {
    res.send({ping: 'pong'})
})

app.get("/api/categorys/", async (req, res) => {
    const models = await app.prisma.category.findMany()
    res.send(models)
})

app.get("/api/categorys/:id", async (req, res) => {
    // @ts-ignore
    const {id} = req.params
    const model = await app.prisma.category.findUnique({
        where: {id: Number(id)}
    })
    res.send(model)
})

app.post("/api/categorys/", async (req, res) => {
    // @ts-ignore
    const {name} = req.body
    const result = await app.prisma.category.create({
        data: {name}
    })
    res.send(result)
})

app.patch("/api/categorys/:id", async (req, res) => {
    // @ts-ignore
    const {id} = req.params
    // @ts-ignore
    const {name} = req.body
    const result = await app.prisma.category.update({
        where: {id: Number(id) || undefined},
        data: {name}
    })
    res.send(result)
})

app.delete("/api/categorys/:id", async (req, res) => {
    // @ts-ignore
    const {id} = req.params
    const result = await app.prisma.category.delete({
        where: {id: Number(id) || undefined}
    })
    res.send(result)
})


app.listen({port: 3000, host: "0.0.0.0"}, (err, addreqs) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    app.swagger();
    console.log(`app listening at ${addreqs}`)
})
