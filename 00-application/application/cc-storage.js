import fastify from 'fastify'
import {  hostname } from 'os'
import { randomUUID } from 'crypto'
import fs from 'fs'
import { lookup } from 'mime-types'

const app  = fastify()
const storageDirectory = process.env.CC_STORAGE_DIRECTORY ?? `/tmp/${randomUUID()}`

export const isReadableFile = async (path) => {
  return new Promise((resolve) => fs.access(path, (err) => resolve(!err)))
}

app.get('/', async () => ({
  version: '1.0.0',
  name: 'cc-k8s-storage',
  descriptions: process.env.CC_APP_DESCRIPTION ?? 'Caen caen storage api.',
  storageDirectory,
  storageUrl: '/files',
  hostname: hostname()
}))

app.get('/files', async () => {
  return  (await fs.promises.readdir(storageDirectory))
    .filter(el => el.match(/^\w+\.\w+$/))
    .map(el => `/files/${el}`)
})

app.get('/files/:fileName', async (request, reply) => {
  const { fileName } = request.params
  const filePath = `${storageDirectory}/${fileName}`
  if (await isReadableFile(filePath)) {
    const file = await fs.promises.readFile(filePath)
    reply.header('content-type', lookup(fileName))
    return file.toString('utf-8')
  }
  reply.status(404)
  throw new Error('File not found')
})

app.listen({
  host: process.env['HTTP_HOST'] || '0.0.0.0',
  port: Number(process.env['HTTP_PORT'] || '3000')
}).then((a) => {
  console.log('server listening on', a)
}).catch(err => {
  console.log(err)
})
