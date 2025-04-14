const { Schema, model } = require('mongoose');

const Course = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('Course', Course);
