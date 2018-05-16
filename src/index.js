'use strict'

const config = require('./config')
const mosca = require('mosca')
const mongoose = require('./services/mongoose')
const auth = require('./services/auth')

const mongooseConnection = mongoose.connect()

var pubsubSettings = {
  type: 'mongo',
  url: config.mongo.uri,
  pubsubCollection: 'ascoltatori',
  mongo: {},
  connection: mongooseConnection
}

var moscaSettings = {
  port: Number(config.port),
  backend: pubsubSettings,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: config.mongo.uri
  }
}

var server = new mosca.Server(moscaSettings)

server.on('ready', () => {
  console.log('MQTT broker is up and running')
  server.authenticate = auth.authenticate
})

// fired when a message is published
server.on('published', function (packet, client) {
  console.log('Published', packet)
})
// fired when a client connects
server.on('clientConnected', function (client) {
  console.log('Client Connected:', client.id)
})

// fired when a client disconnects
server.on('clientDisconnected', function (client) {
  console.log('Client Disconnected:', client.id)
})
