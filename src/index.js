var dbus = require('dbus-native')
var sessionBus = dbus.sessionBus()

sessionBus.listNames((err, results) => {
  if (err) {
    return console.error(err)
  }
  console.log(JSON.stringify(results, null, 2))
})
