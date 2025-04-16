const { Schema, model } = require('mongoose');

const Enrollment = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    currentLesson: { type: Number, default: 1 },
    progress: { type: Number, default: 0 },
    completedLessons: [{ type: Number }]
});

module.exports = model('Enrollment', Enrollment);
