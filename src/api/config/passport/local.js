import{Strategy as LocalStrategy} from 'passport-local';
import User from '../../db/models/User.js';
import jwt from 'jsonwebtoken';
import config from '../../../../config';

export const localSignUp = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true,
        session :false
    },(req,email,password,done) => {
      User.findOne({email},(err,user)=>{
                                  if(err)
                                    return done(err);
                                  if(user){
                                    const error = new Error('User already Exists');
                                    error.message = 'User already Exists';
                                    return done(error);
                                  }
                                  else{
                                    var newUser = new User({
                                      email,
                                      password,
                                      firstName : req.body.firstName,
                                      lastName : req.body.lastName
                                    });
                                    newUser.save(err => {
                                      if(err)
                                        throw err;
                                      return done(null,newUser);
                                    });
                                  }
                                });

    }
);

export const localLogin = new LocalStrategy(
  {usernameField : 'email',
  passwordField :'password',
  session : false},
  (email,password,done) => {
    User.findOne({email},
      (err,user) =>{
        if(err)
          return done(err);
        if(user) {
          user.validatePassword(password.trim() ,
            (err,isMatch) => {
              if(err)
                return done(err);
              if(isMatch) {

                let data = {
                  name : user.firstName+' '+user.lastName,
                  email:user.email
                }
                const payload = {
                                  data
                                };
                let token = jwt.sign(payload,config.jwtSecret);
                return done(null,token);
              }
              else{
                const error = new Error('Invalid Credentials');
                error.message = 'Check your password';
                return done(error);
              }
            }
          );
        }
        else{
          const error = new Error('Invalid Credentials');
          error.message = 'Check your UserName';
          return done(error);
        }
      }
    )
  }
);
