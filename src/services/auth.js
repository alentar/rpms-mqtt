'use strict'

const Device = require('../models/device.model')

const authenticate = (client, username, password, callback) => {
  if (username === 'RPMS_SERVER') callback(null, client)

  Device.findById(username, (err, device) => {
    if (err) callback(new Error('Unauthorized'), null)
    if (device) {
      if (device.isAuthorized()) callback(null, client)
      else callback(new Error('Unauthorized'), null)
    }
  })
}

exports.authenticate = authenticate
