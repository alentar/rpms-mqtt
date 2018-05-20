'use strict'

const Device = require('../models/device.model')

const authenticate = (client, username, password, callback) => {
  if (!username) callback(new Error('Unauthorized'), null)

  if (username && username === 'RPMS_SERVER') {
    callback(null, client)
  } else if (username) {
    Device.findById(username, (err, device) => {
      if (err) callback(new Error('Unauthorized'), null)
      if (device !== null) {
        if (device.isAuthorized()) callback(null, client)
        else callback(new Error('Unauthorized'), null)
      } else {
        callback(new Error('Unauthorized'), null)
      }
    })
  } else {
    callback(new Error('Unauthorized'), null)
  }
}

exports.authenticate = authenticate
