
const bcrypt = require('bcryptjs');
const express = require('express');
const User  = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
exports.register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists!' });
      }

      bcrypt.hash(req.body.password, 10).then(
        (hash) => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save().then(
            () => {
              res.status(201).json({
                message: 'User added successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      );
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Utilisateur non trouvé !'
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              emessage: 'Mot de passe incorrect !'
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          res.status(200).json({
            message: 'Connexion réussie !',
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error:error 
            
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
        
      });
    }
  );
}
