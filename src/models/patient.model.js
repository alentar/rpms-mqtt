'use strict'

const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  value: {
    type: Number
  },

  time: {
    type: Date
  }
})

const patientSchema = new mongoose.Schema({
  bht: {
    type: String,
    required: true,
    index: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  nic: {
    type: String,
    default: ''
  },

  admittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  admittedAt: {
    type: Date,
    default: null
  },

  discharged: {
    type: Boolean,
    default: false
  },

  dischargedAt: {
    type: Date,
    default: null
  },

  dischargedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  telephones: [{
    type: String,
    default: ''
  }],

  dob: {
    type: Date,
    default: null
  },

  age: {
    type: String,
    required: true
  },

  nationality: {
    type: String,
    default: ''
  },

  religion: {
    type: String,
    default: ''
  },

  occupation: {
    type: String,
    default: ''
  },

  martialStatus: {
    type: String,
    default: 'Single'
  },

  sex: {
    type: String,
    default: 'male'
  },

  clinicalNotes: {
    type: String,
    default: ''
  },

  examination: {
    type: String,
    default: ''
  },

  invistigation: {
    type: String,
    default: ''
  },

  treatment: {
    type: String,
    default: ''
  },

  reason: {
    type: String,
    default: ''
  },

  typeOfAdmission: {
    type: String,
    default: ''
  },

  extra: {
    type: String,
    default: ''
  },

  records: {
    temperature: [recordSchema],
    bpm: [recordSchema]
  },

  ward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ward'
  },

  bed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed'
  }
}, {
  timestamps: true
})

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient
