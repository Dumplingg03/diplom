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
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const userRole = await Role.findOne({value: "ADMIN"})
            const user = new User({username, password, roles: [userRole.value]})
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
                res.status(400).json({message: `Пользователь с ${username} не найден`})
            }

            const validPassword = password === user.password


            if(!validPassword){
                res.status(400).json({message: `Введен неверный пароль`}) 
            }

            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch(e){
            console.log(e)
            res.status(400).json({message: 'Login error'})
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
}

module.exports = new authController()