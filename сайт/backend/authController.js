const User = require('./models/User')
const Role = require('./models/Role')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class authController{
    async registration(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {username, password, email} = req.body
            const candidate = await User.findOne({$or: [{username}, {email}]})
            if (candidate){
                return res.status(400).json({message: 'Пользователь с таким именем или email уже существует'})
            }
            const userRole = await Role.findOne({value: "ADMIN"})
            const user = new User({username, password, email, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован!'})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try{
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: `Пользователь с ${username} не найден`})
            }

            const validPassword = password === user.password

            if(!validPassword){
                return res.status(400).json({message: `Введен неверный пароль`}) 
            }

            const token = generateAccessToken(user._id, user.roles)
            return res.json({
                token,
                user: {
                    id: user._id,
                    login: user.username,
                    email: user.email || ''
                }
            })
        } catch(e){
            console.log(e)
            return res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try{
            const users = await User.find()
            res.json(users)
            
        } catch(e){
            console.log(e)
            return res.status(500).json({message: 'Server error'})
        }
    }

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id)
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'})
            }
            return res.json({
                login: user.username,
                email: user.email || ''
            })
        } catch(e) {
            console.log(e)
            return res.status(500).json({message: 'Ошибка сервера'})
        }
    }

    async updateProfile(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findById(req.user.id);
            
            if (!user) {
                return res.status(404).json({message: 'Пользователь не найден'});
            }

            if (email) {
                const existingUser = await User.findOne({ email });
                if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                    return res.status(400).json({message: 'Пользователь с таким email уже существует'});
                }
                user.email = email;
            }

            if (password) {
                user.password = password;
            }

            await user.save();
            return res.json({message: 'Изменения сохранены'});
        } catch(e) {
            console.log(e);
            return res.status(500).json({message: 'Ошибка сервера'});
        }
    }
}

module.exports = new authController()