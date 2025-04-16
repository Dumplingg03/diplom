const mongoose = require('mongoose');
const Enrollment = require('./models/Enrollment');
const User = require('./models/User');
const Course = require('./models/Course');

// Подключение к базе данных
mongoose.connect('mongodb+srv://admin:admin@cluster0.zeoir0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Подключено к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Функция для добавления тестовых записей на курсы
async function seedEnrollments() {
    try {
        // Очищаем коллекцию записей
        await Enrollment.deleteMany({});
        console.log('Коллекция записей очищена');

        // Получаем первого пользователя (для тестирования)
        const user = await User.findOne();
        if (!user) {
            console.error('Пользователь не найден. Сначала создайте пользователя.');
            return;
        }
        console.log(`Найден пользователь: ${user.email}`);

        // Получаем все курсы
        const courses = await Course.find();
        if (courses.length === 0) {
            console.error('Курсы не найдены. Сначала запустите seedCourses.js');
            return;
        }

        // Создаем тестовые записи на курсы
        const enrollments = [
            {
                userId: user._id,
                courseId: courses[0]._id, // Веб-разработка с нуля
                currentLesson: 3,
                progress: 25,
                completedLessons: [1, 2]
            },
            {
                userId: user._id,
                courseId: courses[1]._id, // Python для начинающих
                currentLesson: 5,
                progress: 40,
                completedLessons: [1, 2, 3, 4]
            },
            {
                userId: user._id,
                courseId: courses[2]._id, // Дизайн интерфейсов
                currentLesson: 8,
                progress: 100,
                completedLessons: [1, 2, 3, 4, 5, 6, 7, 8]
            },
            {
                userId: user._id,
                courseId: courses[3]._id, // JavaScript продвинутый
                currentLesson: 1,
                progress: 0,
                completedLessons: []
            }
        ];

        // Добавляем записи
        await Enrollment.insertMany(enrollments);
        console.log('Тестовые записи на курсы успешно добавлены');

        // Выводим список добавленных записей
        const addedEnrollments = await Enrollment.find({ userId: user._id }).populate('courseId');
        console.log('Добавленные записи:');
        addedEnrollments.forEach(enrollment => {
            console.log(`- ${enrollment.courseId.title} (Прогресс: ${enrollment.progress}%)`);
        });

        // Закрываем соединение
        await mongoose.connection.close();
        console.log('Соединение с базой данных закрыто');
    } catch (error) {
        console.error('Ошибка при добавлении записей на курсы:', error);
    }
}

// Запускаем функцию
seedEnrollments(); 