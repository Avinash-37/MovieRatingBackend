const express =require('express');
const router = require('express-promise-router')();
const {validateBody, schemas } = require('../helpers/routeHelpers');
const UserController = require('../controllers/user');
const passport =require('passport');
const passportConf = require('../passport');


router.route('/insertmovie')
    .post( UserController.insertmovie);

router.route('/movieList')
    .get( UserController.movieList);
    
router.route('/movierating')
    .post( UserController.movierating);

router.route('/getmovierating')
    .get( UserController.Getmovierating);

router.route('/sortbydate')
    .get( UserController.SortMoviesByDate);

router.route('/sortbyrate')
    .get( UserController.SortMoviesByRating);

router.route('/singlemoviestar')
    .post( UserController.GetSingleMovieRating);

router.route('/signup')
    .post(validateBody(schemas.authschema), UserController.signUp);

router.route('/signin')
    .post(passport.authenticate('local',{session: false}),UserController.signIn);

router.route('/oauth/google')
    .post(passport.authenticate('googleToken',{session: false}),UserController.googleOauth);

router.route('/oauth/facebook')
    .post(passport.authenticate('facebookToken',{session: false}),UserController.facebookOauth);

router.route('/secret')
    .get(passport.authenticate('jwt',{session:false}),UserController.secret);


module.exports = router;