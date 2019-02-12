const net = require('net')

let server = net.createServer(clientSocket => {
  let authString = ''
  clientSocket.on('data', chunk => {
    if (authString != null) {
      authString += chunk.slice(1).toString('utf8')
      if (authString.match(/^AUTH EXTERNAL (\d+)\r\n/)) {
        console.log(`c:'${authString}'`)
        // Stop listning for data
        clientSocket.removeAllListeners('data')
        clientSocket.removeAllListeners('end')
        clientSocket.pause()

        clientSocket.on('data', chunk => {
          console.log(`c:'${chunk.toString()}'`)
        })

        // Create new auth header with this process user id
        let uid = process.getuid()
        let newId = Buffer.from(uid.toString()).toString('hex')
        let dbusSocket = net.createConnection(`/run/dbus/system_bus_socket`)

        dbusSocket.on('data', chunk => {
          console.log(`d:'${chunk.toString()}'`)
        })
        dbusSocket.on('error', err => {
          console.error(err)
        })
        dbusSocket.on('end', () => {
          console.log(chunk.toString())
        })

        dbusSocket.pipe(clientSocket)
        clientSocket.pipe(dbusSocket)
        dbusSocket.write('\0')
        dbusSocket.write(`AUTH EXTERNAL ${newId}\r\n`)
        clientSocket.resume()
        authString = null
      }
    }
  })
  clientSocket.on('error', err => {
    console.error(err)
  })
  clientSocket.on('end', () => {
    console.error('clientSocket end')
  })
})
server.listen(12345)
