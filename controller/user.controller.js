const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const crypto =  require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

//Config
const jwtSecret = require('../config/env');

//Models
const db = require('../config/db.config');
const User = db.user;
const Op = Sequelize.Op;

// BCRYPT SALT
const BCRYPT_SALT_ROUNDS = 12;


exports.signup = (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else {
      req.logIn(user, (error) => {
        const data = {
          name: req.body.name,
          email: req.body.email,
          depend: req.body.depend,
          description: req.body.description,
          username: user.username,
        };
        //console.log("DATA: ",data);
        User.findOne({
          where: {
            username: data.username,
          },
        }).then(user => {
          //console.log(user);
          user
            .update({
              name: data.name,
              email: data.email,
              depend: data.depend,
              description: data.description
            })
            .then(() => {
              console.log('User created in db');
              res.status(200).send({ message: 'User created' });
            });
        });
      });
    }
  })(req, res, next);
};


exports.signin = (req, res, next) => {
  passport.authenticate('login', (err, users, info) => {
    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      console.error(info.message);
      if (info.message === 'bad username') {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
      req.logIn(users, () => {
        User.findOne({
          where: {
            username: req.body.username,
          },
        }).then(user => {
          const token = jwt.sign({ id_user: user.id_user }, jwtSecret.secret, {
            expiresIn: 60 * 60,
          });
          res.status(200).send({
            isAuthenticated: true,
            token,
            user: {
              id_user: user.id_user,
              name: user.name,
              username: user.username,
              email: user.email
            },
            message: 'User found & logged in',
          });
        });
      });
    }
  })(req, res, next);
};


exports.loaduser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      res.status(401).send(info.message);
    } else if (user) {
      User.findOne({
        where: {
          username: user.username,
        },
      }).then((userInfo) => {
        if (userInfo != null) {
          console.log('user found in db from findUsers');
          res.status(200).json({
            isAuthenticated: true,
            user: {
              id_user: user.id_user,
              name: user.name,
              username: user.username,
              email: user.email
            },
            message: 'User found in db',
          });
        } else {
          console.error('no user exists in db with that username');
          res.status(404).send('No user exists.');
        }
      });
    } else {
      console.error('jwt id and username do not match');
      res.status(403).send('Server error, please try again.');
    }
  })(req, res, next);
};


exports.forgotpassword = (req, res, next) => {
  if (req.body.email === '') {
    res.status(400).send('The Email address cannot be empty.');
  }
  console.error(req.body.email);
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user === null) {
      console.error('email not in database');
      res.status(403).send('That email address is not recognized. Please try again or register for a new account.');
    } else {
      const token = crypto.randomBytes(20).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000,
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${user.email}`,
        subject: 'Link To Reset Password',
        //text:
        //  'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
        //  + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
        //  + `http://localhost:3001/api/auth/resetpassword/${token}\n\n`
        //  + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        html: '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
          + `<a href="${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}">${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}</a>\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.</p>\n',

      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('Password reseted successfully & email sent.');
        }
      });
    }
  });
}


exports.resetpassword = (req, res, next) => {
  User.findOne({
    where: {
      resetPasswordToken: req.params.resetpasswordtoken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    },
  }).then((user) => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('Password reset link is invalid or has expired.');
    } else {
      res.status(200).send({
        username: user.username,
        message: 'Password reset link a-ok',
      });
    }
  });
};


exports.updatepasswordviaemail = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
      resetPasswordToken: req.body.resetpasswordtoken,
      resetPasswordExpires: {
        [Op.gt]: Date.now(),
      },
    },
  }).then(user => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('Problem resetting password. Please send another reset link.');
    } else if (user != null) {
      console.log('user exists in db');
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          });
        })
        .then(() => {
          console.log('password updated');
          res.status(200).send('Your password has been successfully reset, please try logging in again.');
        });
    } else {
      console.error('no user exists in db to update');
      res.status(404).json('Server error, please try again to reset.');
    }
  });
};