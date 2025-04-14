const { Schema, model } = require('mongoose');

const Enrollment = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now }
});

module.exports = model('Enrollment', Enrollment);
