const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const {JWT_SECRET, JWT_EXPIRY} = require('../config');
const router = express.Router();


function createAuthToken(user){
  return jwt.sign({user}, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}

/* ========== POST/CREATE AN ITEM ========== */

const options = {session: false, failWithError: true};

const localAuth = passport.authenticate('local', options);
const jwtAuth = passport.authenticate('jwt', {session: false, failWithError: true});

router.post('/refresh', jwtAuth,  function(req, res){
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

router.post('/', localAuth, function(req, res){
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = router;
