import fastify from 'fastify'
import {  hostname } from 'os'
const app  = fastify()

app.addHook('onRequest', async (request, reply) => {
  const header = process.env['CC_HEADER_NAME']
  if (header) {
    reply.header(header, `Caen camp header value.`)
  }
})

app.get('/', async () => ({
  version: '1.0.0',
  name: 'cc-k8s-api',
  descriptions: process.env['CC_APP_DESCRIPTION'] ?? 'Caen caen k8s api.',
  hostname: hostname(),
  loop: '/loop'
}))

app.get('/loop', () => {
  let i = 123
  while (true) {
    i = i > 10 ** 6 ? (i / 2) + 1 : i * 3
    console.log(i)
  }
})

app.listen({
  host: process.env['HTTP_HOST'] || '0.0.0.0',
  port: Number(process.env['HTTP_PORT'] || '3000')
}).then((a) => {
  console.log('server listening on', a)
}).catch(err => {
  console.log(err)
})
