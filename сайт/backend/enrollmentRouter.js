const Router = require('express');
const router = new Router();
const Enrollment = require('./models/Enrollment');
const Course = require('./models/Course');
const authMiddleware = require('./middleware/authMiddleware');
const mongoose = require('mongoose');

// POST /api/enroll
router.post('/', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.body;

    try {
        // Проверяем, что courseId - это строка
        if (typeof courseId !== 'string') {
            return res.status(400).json({ message: 'Неверный формат ID курса' });
        }

        // Ищем курс по ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Курс не найден' });
        }

        // Проверяем, не записан ли пользователь уже на этот курс
        const alreadyEnrolled = await Enrollment.findOne({ 
            userId: new mongoose.Types.ObjectId(userId), 
            courseId: new mongoose.Types.ObjectId(courseId) 
        });
        
        if (alreadyEnrolled) {
            return res.status(400).json({ message: 'Вы уже записаны на курс' });
        }

        // Создаем новую запись
        const enrollment = new Enrollment({ 
            userId: new mongoose.Types.ObjectId(userId), 
            courseId: new mongoose.Types.ObjectId(courseId) 
        });
        await enrollment.save();

        res.status(201).json({ message: 'Успешно записаны на курс' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// GET /api/enroll/check/:courseId
router.get('/check/:courseId', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    const { courseId } = req.params;

    try {
        const enrollment = await Enrollment.findOne({ 
            userId: new mongoose.Types.ObjectId(userId), 
            courseId: new mongoose.Types.ObjectId(courseId) 
        });
        
        res.json({ isEnrolled: !!enrollment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

// GET /api/enroll/user-courses
router.get('/user-courses', authMiddleware, async (req, res) => {
    const userId = req.user.id;

    try {
        const enrollments = await Enrollment.find({ 
            userId: new mongoose.Types.ObjectId(userId)
        }).populate('courseId');
        
        // Преобразуем данные для фронтенда
        const courses = enrollments.map(enrollment => {
            const course = enrollment.courseId.toObject();
            return {
                ...course,
                _id: course._id,
                currentLesson: enrollment.currentLesson,
                progress: enrollment.progress,
                remainingLessons: course.totalLessons - enrollment.currentLesson + 1
            };
        });
        
        res.json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;
