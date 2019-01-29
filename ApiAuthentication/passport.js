const passport =require('passport');
const JwtStrategy =require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const Twitter = require('twitter');
const LocalStrategy = require('passport-local').Strategy;
const {JWT_SECRET} = require('./configuration');
const User =require('./model/user');

passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
},async(payload,done) =>{
    try{
            const user = await User.findById(payload.sub);
    
        if(!user){
            return done(null,false);
        }
        done(null, user);

        }catch(error){
            done(error,false);
        }
}));
//GOOGLE OAUTH STARATEGY

passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID:'572480021249-tma02oi1tfusbeo1ojq78d3us4sdl3aa.apps.googleusercontent.com',
    clientSecret: 'FkhS1GgafGYKyeBnaH_08Zbk'
},async(accessToken, refreshToken, profile,done)=>{
    try{
        console.log('access token',accessToken);
        console.log('refresh token',refreshToken);
        console.log('Profile ',profile);
        // CHECK WHETHER THIS CURRENT USER EXIST IN OUR DBjkj
        const existingUser = await User.findOne({"google.id": profile.id});
        if(existingUser){
            console.log('User Already exist in DB');
            return done(null,existingUser);
        }
        // If New account
            console.log('User dosent exist we created one');
            const newUser = new User({
                method: 'google',
                google:{
                    id: profile.id,
                    email: profile.emails[0].value,
                    refreshToken : refreshToken,
                    accessToken : accessToken
                }
            });
            await newUser.save();
            done(null,newUser);
    }
    catch(error){
        done(error,false,error.message)
    }
}));

// FACEBOOK STRATEGY 
passport.use('facebookToken',new FacebookTokenStrategy({
    clientID : '389230111637590',
    clientSecret: '854f6996dd045cf9a88992b708e263ce'
},async(accessToken,refreshToken,profile,done) =>{
    try{
        console.log('access token',accessToken);
        console.log('refresh token',refreshToken);
        console.log('profile',profile);

        //CHECK WHETHER THIS USER EXIST IN OUR DB
        const existingUser =await User.findOne({"facebook.id":profile.id});
        if(existingUser){
            console.log('User Already exist in DB');
            return done(null,existingUser);
        }
        // If New account create
            console.log('User dosent exist we created one');
            const newUser = new User({
                method: 'facebook',
                facebook:{
                    id: profile.id,
                    email: profile.emails[0].value,
                    accessToken :accessToken
                }
            });
            await newUser.save();
            done(null,newUser);


    }catch(error)
    {
        done(error,false,error.message);
    }
}))

 // LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField :'email'
},async(email,password,done) =>{
    try{
        const user = await User.findOne({ "local.email":email });
        
            if(!user){
                return done(null,false);
            }
        const isMatch = await user.isValidPassword(password);

        if(!isMatch){
            return done(null,false);
        }
        done(null,user);

    }catch(error){
        done(error,false); 
    }
   
}))
