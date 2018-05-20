'use strict'

const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 40,
    default: ''
  },

  mac: {
    type: String,
    required: true,
    index: true,
    unique: true
  },

  chipId: {
    type: String
  },

  authorized: {
    type: Boolean,
    default: false
  },

  assigned: {
    type: Boolean,
    default: false
  },

  blacklisted: {
    type: Boolean,
    default: false
  },

  mqttTopic: {
    type: String,
    default: null
  },

  ward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ward',
    default: null
  },

  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
    default: null
  }
}, {
  timestamps: true
})

deviceSchema.method({
  isAuthorized () {
    return this.authorized === true
  },

  isAssigned () {
    return this.assigned === true
  },

  isBlacklisted () {
    return this.blacklisted === true
  },

  hasTopic () {
    return this.mqttTopic !== null
  }
})

const Device = mongoose.model('Device', deviceSchema)
module.exports = Device
