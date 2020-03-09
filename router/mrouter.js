const express = require ('express');
const router = express.Router ();
const md5 = require ('blueimp-md5');

const User = require ('../model/login.js');

router.get ('/', (req, res) => {
    User.find ((err, users) => {
        res.render ('index.html', {
            user: req.session.user,
            users: users
        });
    })
});

router.get ('/login', (req, res) => {
    res.render ('login.html');
});

router.post ('/login', (req, res) => {
    let userName = req.body.username,
        passWord = md5 (md5 (req.body.password));

    User.findOne ({
        username: userName,
        password: passWord
    }, (err, user) => {
        if (err) {
           return res.status (500).json ({
               err_code: 500,
               message: 'Server error...'
           });
        }

        if (!user) {
            return res.status (200).json ({
                err_code: 1,
                message: 'username or password error'
            });
        } 

        res.status (200).json ({
            err_code: 0,
            message: 'username is true'
        });
       
        req.session.user = user;
        req.session.save (function (err) {
            console.log (err);
        })
    })
});

router.get ('/register', (req, res) => {
    res.render ('register.html');
})

router.post ('/register', (req, res) => {
    let userName = req.body.username,
        eMile = req.body.emile,
        passWord = md5 (md5 (req.body.password));
        
    User.findOne ({
        username: userName
    }, (err, data) => {
        if (err) {
           return res.status (500).json ({
               err_code: 500,
               message: 'Server error'
           })
        }

        if (data) {
            return res.status (200).json ({
                err_code: 1,
                message: 'email or nicname is exit'
            })
        }

        new User ({
            email: eMile,
            username: userName,
            password: passWord
        }).save ((err, users) => {
            if (err) {
                return res.status (500).json ({
                    err_code: 500,
                    message: 'Server error'
                })
            }
            res.status (200).json ({
                err_code: 0,
                message: 'The register is success...'
            })
        })
    } )
});

router.get ('/logout', (req, res) => {
    req.session.user = null;
});

router.get ('/send', (req, res) => {
    res.render ('send.html');
});

router.post ('/send', (req, res) => {
    let body = req.body,
        username = body.username,
        bio = body.content;
    User.findOneAndUpdate (username, {bio: bio}, (err, data) => {
        if (err) {
            console.log (err);
        } else {
            console.log (data);
        }

    })
    res.redirect ('/');
})

module.exports = router;
