const dbus = require('dbus-native')

//process.env.DBUS_SYSTEM_BUS_ADDRESS = `tcp:host=localhost,port=12345`
process.env.DBUS_SYSTEM_BUS_ADDRESS = `unix:path=${__dirname}/../system_bus_socket`

// Overwrite the uid for dbus authentication
process.getuid = () => {
  return 1000
}

const systemBus = dbus.systemBus()

systemBus.listNames((err, notifications) => {
  console.log(JSON.stringify(err))
  console.log(JSON.stringify(notifications))
})

systemBus
  .getService('org.freedesktop.login1')
  .getInterface(
    '/org/freedesktop/login1',
    'org.freedesktop.login1.Manager',
    (err, loginManager) => {
      if (err) {
        return console.error(err)
      }
      loginManager.on('SessionNew', (sessionId, sessionPath) => {
        console.log(`open session ${sessionId}: ${sessionPath}`)
      })
      loginManager.on('SessionRemoved', (sessionId, sessionPath) => {
        console.log(`close session ${sessionId}: ${sessionPath}`)
      })
    }
  )
