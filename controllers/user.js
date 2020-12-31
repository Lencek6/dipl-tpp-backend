const models = require('../models/index');
const user = models.user;
const pwdHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Login user
exports.login = async function(req, res) {
    try {
        let tmpUser = await user.findOne({
            where: {
                userName: req.body.userName
            }
        });

        // Verify password
        if(tmpUser && pwdHash.verify(req.body.password, tmpUser.password)){
            // Sign jwt and send it to frontend
            let token = jwt.sign({ id: tmpUser.id, name: tmpUser.name, lastName: tmpUser.lastName, userName: tmpUser.userName}, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
            res.json({
                success: true,
                message: 'Dobrodošli ' + tmpUser.name + ' ' + tmpUser.lastName,
                token: token
            });
        }else{
            res.json({
                success: false,
                message: 'Napačno uporabniško ime ali geslo'
            });
        }
    }catch (e) {
        console.log(e);
    }
}

// Register user
exports.register = async function(req, res) {
    try {
        let result = await user.findOrCreate({
            where: {
                userName: req.body.userName
            },
            defaults: {
                userName: req.body.userName,
                name: req.body.name,
                lastName: req.body.lastName,
                password: pwdHash.generate(req.body.password)
            }
        });

        // in result[1] is stored information if record was created or not
        if(!result[1]){
            res.json({
                success: false,
                message: 'Uporabniško ime že obstaja'
            });
        }else{
            res.json({
                success: true,
                message: 'Uporabnik uspešno ustvarjen'
            });
        }
    }catch (e){
        console.log(e);
    }
}

