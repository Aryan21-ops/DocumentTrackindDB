const { response } = require('express')
const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }
        let admin = new Admin ({
            adminId: req.body.adminId,
            adminname: req.body.adminname,
            password: hashedPass,
            email: req.body.email
        })
        admin.save()
        .then(admin => {
            res.json({
                message: 'Admin added Succesfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'Admin added succesfully!'
            })
        })
    })
}

const login = (req, res, next) => {
    var adminname = req.body.adminname
    var password = req.body.password

    Admin.findOne({$or: [{email:adminname},{adminId:adminname}]})
    .then(admin => {
        if(admin){
            bcrypt.compare(password, admin.password, function(err, resut) {
                if(err){
                    res.json({
                        error : err
                    })
                }
                if(res){
                    let token = jwt.sign({name: admin.name},  'AaBdr(23)', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No admin found!'
            })
        }
    })
}




module.exports = {
    register, login 
}