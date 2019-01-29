const User = require('../model/user');
const Movies = require('../model/movie');
const Moviesrating = require('../model/movierating');
const JWT = require('jsonwebtoken');
const {JWT_SECRET} = require('../configuration/index');

signToken = user =>{
    return JWT.sign({
        iss: 'Avinash',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+1)

    },JWT_SECRET);
}
module.exports = {
   // GETTING MOVIES LIST
    movieList : async(req,res) =>{
       const movieslist= await Movies.find({});
       console.log(movieslist);
       res.json(movieslist);
    },
    //INSERT MOVIES INTO DATABASE
    insertmovie : async(req,res) =>{
        var {name,actor,director,date} = req.body;
        var movie = new Movies({name: name,actor:actor,director:director});
        // MONGOOSE INSERT FUNCTION FOR MOVIE
        movie.save(function (err, movie) {
            if (err) return console.error(err);
            console.log(movie.name + " = saved to movies collection.");
          });
      res.json(movie);
    },
    // INSERT COMMENT AND RATING INTO DATABASE
    movierating : async(req,res) =>{
        var {movieName,comment,star,commentedBy} = req.body;
        var movieratings = new Moviesrating({movieName: movieName,comment:comment,star:star,commentedBy:commentedBy});
        // MONGOOSE INSERT FUNCTION FOR RATING
        movieratings.save(function (err, movierating) {
            if (err) return console.error(err);
            console.log(movierating.movieName + " = saved to movierating collection.");
          });
      res.json(movieratings);
    },
    //GETTING MOVIES RATING
    Getmovierating : async(req,res) =>{
        var allRating = await Moviesrating.find({});

        console.log(allRating);
        res.json(allRating);
    },
    //GETTING SINGLE MOVIES RATING
    GetSingleMovieRating : async(req,res) =>{
        var {movieName} =req.body;
        var singleRating = await Moviesrating.find({movieName:movieName});

        console.log(singleRating);
        res.json(singleRating);
    },

    //SORT MOVIES BY DATE
    SortMoviesByDate : async(req,res) => {
        var sortbydate = await Moviesrating.find().sort({Date : -1});
        console.log(sortbydate);
        res.json(sortbydate);
    },
    //SORT MOVIES BY RATING
    SortMoviesByRating : async(req,res) => {
        var sortbyrate = await Moviesrating.find().sort({star : 'desc'});
        console.log(sortbyrate);
        res.json(sortbyrate);
    },
    //SIGNUP USER USING USERNAME AND PASSWORD
    signUp : async(req,res,next) =>{

        const {email,password } =req.value.body;
        // check if there is a user with the same email
        const foundUser = await User.findOne({"local.email":email});
            if(foundUser){
                return res.status(403).json({error: 'Email is already in use...'});
            }
        // Create new user     
        const newUser = new User({
            method :'local',
            local:{
                email: email,
                password: password
            }
        });
                await newUser.save();
                const token = signToken(newUser);
                res.status(200).json({token});
                console.log('New User Created !!!!!');
    },
    // SIGN IN USER
    signIn : async(req,res,next) =>{        
        const token = signToken(req.user);
        res.status(200).json({token});
        console.log('Successfully login !!!!!!');
       
    },
  
    facebookOauth: async(req,res,next) =>{
       const token = signToken(req.user);
       res.status(200).json({token});
       console.log('Successfully login !!!!!!');
      
   },
    googleOauth: async(req,res,next) =>{
    const token = signToken(req.user);
    res.status(200).json({token});
    console.log('Successfully login !!!!!!');
    
    },
    secret : async(req,res,next) =>{
        
        res.json({secret:"Authorization key validate"});
        console.log('Authorization key validate !!!!!!');

        
    }
}