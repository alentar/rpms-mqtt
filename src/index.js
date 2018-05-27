'use strict'

const config = require('./config')
const mosca = require('mosca')
const mongoose = require('./services/mongoose')
const auth = require('./services/auth')
const Patient = require('./models/patient.model')

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
server.on('published', async (packet, client) => {
  if (packet.topic.includes('wards') && packet.topic.includes('patient')) {
    const props = {}
    packet.topic.split('/').forEach((elem, i, arr) => {
      if (i % 2 === 0) props[elem] = arr[i + 1] ? arr[i + 1] : null
    })

    const data = {}
    data[`records.${props.type}`] = { value: packet.payload.toString(), time: Date.now() }

    try {
      await Patient.findByIdAndUpdate(props.patient, { '$push': data })
    } catch (err) {
      console.log(err)
    }
  }
})

// fired when a client connects
server.on('clientConnected', (client) => {
  console.log('Client Connected:', client.id)
})

// fired when a client disconnects
server.on('clientDisconnected', (client) => {
  console.log('Client Disconnected:', client.id)
})
