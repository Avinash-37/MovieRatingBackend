const User = require('../model/user');
const Movies = require('../model/movie');
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
    movieList : async(req,res,next) =>{
        const foundMovies = await Movies.find({ });
            if(!foundMovies){
                return res.status(403).json({error: 'List Not found...'});
            }else{
                return res(foundUser);
            }
    },
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