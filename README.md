# dbus-test

Small test repo to talk to dbus from Node

Port/socket forward with SSH to a remote servers system dbus:

``` bash
ssh -xL $(pwd)/system_bus_socket:/run/dbus/system_bus_socket user@server
```

Same with TCP:

``` bash
socat -v TCP-LISTEN:12345,reuseaddr,fork UNIX-CONNECT:/run/dbus/system_bus_socket
```
