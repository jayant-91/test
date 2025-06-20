// server.js
// import cluster from 'cluster'
// import http from 'http'
// import os from 'os'
const cluster = require('cluster')
const http = require('http')
const os = require('os')


const numCPUs = os.cpus().length
const PORT = process.env.PORT || 3000

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new one...`)
    cluster.fork()
  })
} else {
  // Workers share the TCP connection in this server
  const server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end(`Handled by worker ${process.pid}\n`)
  })

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is listening on port ${PORT}`)
  })
}

