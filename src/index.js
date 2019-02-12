const dbus = require('dbus-native')

//process.env.DBUS_SYSTEM_BUS_ADDRESS = `tcp:host=localhost,port=12345`
//process.env.DBUS_SYSTEM_BUS_ADDRESS = `unix:path=${__dirname}/../system_bus_socket`

// Overwrite the uid for dbus authentication
process.getuid = () => {
  return 0
}

const systemBus = dbus.systemBus()

systemBus.listNames((err, notifications) => {
  console.log(JSON.stringify(err))
  console.log(JSON.stringify(notifications))
})
