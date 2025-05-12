import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { userModel } from "../models/user.js";


passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser(async(id,done)=>{
    try{
        const user = await userModel.findById(id)
        done(null,user)
    }
    catch(error){
        done(error,null)
    }
})


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL,
}, async(accessToken,refreshToken,profile,done)=>{
    try {
       const  existingUSer =  await userModel.findOne({googleId:profile.id})
       if(existingUSer){
            return done(null,existingUSer)
       }
         const newUser = await userModel.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                googleId:profile.id,
                avatar:profile.photos[0].value,
                isEmailVerified: profile.emails[0].verified,
                
         })
         return done(null,newUser)
    }
    catch (error) {
        return done(error,null)
    }
}));