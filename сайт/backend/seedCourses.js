const mongoose = require('mongoose');
const Course = require('./models/Course');

// Подключение к базе данных
mongoose.connect('mongodb+srv://admin:admin@cluster0.zeoir0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Подключено к MongoDB'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Список курсов для добавления
const courses = [
    {
        _id: '661a15e899ac34f12ce9477a',
        title: 'Веб-разработка с нуля',
        description: 'Курс по основам веб-разработки',
        totalLessons: 12
    },
    {
        _id: '661a15e899ac34f12ce9477b',
        title: 'Python для начинающих',
        description: 'Курс по основам Python',
        totalLessons: 10
    },
    {
        _id: '661a15e899ac34f12ce9477c',
        title: 'Дизайн интерфейсов',
        description: 'Курс по дизайну интерфейсов',
        totalLessons: 8
    },
    {
        _id: '661a15e899ac34f12ce9477d',
        title: 'JavaScript продвинутый',
        description: 'Углублённое изучение JavaScript для опытных разработчиков',
        totalLessons: 15
    },
    {
        _id: '661a15e899ac34f12ce9477e',
        title: 'React.js с нуля',
        description: 'Изучение библиотеки React.js для создания современных веб-приложений',
        totalLessons: 14
    },
    {
        _id: '661a15e899ac34f12ce9477f',
        title: 'Node.js для начинающих',
        description: 'Основы серверной разработки на Node.js с примерами и практикой',
        totalLessons: 10
    },
    {
        _id: '661a15e899ac34f12ce94770',
        title: 'UI/UX дизайн',
        description: 'Проектирование удобных интерфейсов и понимание поведения пользователей',
        totalLessons: 9
    },
    {
        _id: '661a15e899ac34f12ce94771',
        title: 'DevOps практика',
        description: 'Практические навыки работы с DevOps-инструментами и автоматизация процессов',
        totalLessons: 12
    },
    {
        _id: '661a15e899ac34f12ce94772',
        title: 'Тестирование ПО',
        description: 'Методологии тестирования, написание тест-кейсов и автоматизация',
        totalLessons: 11
    }
    
];

// Функция для добавления курсов
async function seedCourses() {
    try {
        // Очищаем коллекцию курсов
        await Course.deleteMany({});
        console.log('Коллекция курсов очищена');

        // Добавляем новые курсы
        await Course.insertMany(courses);
        console.log('Курсы успешно добавлены');

        // Выводим список добавленных курсов
        const addedCourses = await Course.find();
        console.log('Добавленные курсы:');
        addedCourses.forEach(course => {
            console.log(`- ${course.title} (ID: ${course._id})`);
        });

        // Закрываем соединение
        await mongoose.connection.close();
        console.log('Соединение с базой данных закрыто');
    } catch (error) {
        console.error('Ошибка при добавлении курсов:', error);
    }
}

// Запускаем функцию
seedCourses(); 