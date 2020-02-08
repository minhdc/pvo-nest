// import passport from "passport";
// import passportLocal from "passport-local";
// import passportFacebook from "passport-facebook";
// import passportGoogle from "passport-google-oauth";
// import passportOAuth from "passport-oauth2";

// import passportjwt, { ExtractJwt } from "passport-jwt";
// import _ from "lodash";

// // import { User, UserType } from '../models/User';
// // import { UserModel, UserDocument } from "../api/models/user.model";
// // import UserController from "../api/controllers/user.controller";
// // import { Request, Response, NextFunction } from "express";
// // import { UserServices } from "../api/services/user.services";
// // import { BaseResponse } from "../util/responses";
// // import { Responses } from "../util/responses";
// // import msg from "../config/messages.json";
// // import { UserRepository } from "../api/repo/UserRepo";
// ;
// const LocalStrategy = passportLocal.Strategy;
// const FacebookStrategy = passportFacebook.Strategy;
// const PassportJWTStrategy = passportjwt.Strategy;
// const PassportOAuthStrategy = passportOAuth.Strategy;
// const PassportGoogleStrategy = passportGoogle.OAuth2Strategy;

// // const userRepo = UserRepository;

// passport.serializeUser<any, any>((user, done) => {
//     done(undefined, user.id);
// });

// passport.deserializeUser((id: string, done) => {
//     userRepo.getById(id)
//         .then(r => {
//             const data = {
//                 _id: r._id,
//                 email: r.email,
//             };
//             done(null, data);
//         })
//         .catch(err => {
//             done(err, undefined);
//         });
// });


// /**
//  * Sign in using Email and Password.
//  */
// passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//     userRepo.getOne({ email: email.toLowerCase() })
//         .then(result => {
//             if (!result) {
//                 return done(undefined, false, { message: `Email ${email} not found.` });
//             }
//             const data = {
//                 id: result.id,
//                 email: result.email,
//             };
//             result.comparePassword(password)
//                 .then(isMatch => {
//                     if (isMatch) {
//                         return done(undefined, data);
//                     }
//                     return done(undefined, false, { message: "Invalid email or password." });
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     return done(err);
//                 });
//         })
//         .catch(err => {
//             console.log(err);
//             return done(err);
//         });
//     // UserModel.findOne({ email: email.toLowerCase() }, (err, user: UserDocument) => {
//     //     if (err) { return done(err); }
//     //     if (!user) {
//     //         return done(undefined, false, { message: `Email ${email} not found.` });
//     //     }
//     //     user.comparePassword(password)
//     //         .then(isMatch => {
//     //             if (isMatch) {
//     //                 return done(undefined, user);
//     //             }
//     //             return done(undefined, false, { message: "Invalid email or password." });
//     //         })
//     //         .catch(err => {
//     //             console.log(err);
//     //             return done(err);
//     //         });                       

//     // });
// }));

// /**
//  * JWT
//  */
// const jwtOptions = {
//     "jwtFromRequest": ExtractJwt.fromAuthHeaderAsBearerToken(),
//     "secretOrKey": process.env.JWT_SECRET
// };
// passport.use(new PassportJWTStrategy(jwtOptions, function (jwtPayload, next) {
//     console.log("payload received", jwtPayload);
//     userRepo.getOne({ _id: jwtPayload.id })
//         .then(r => {
//             if (!r) {
//                 next(null, false);
//             } else {
//                 const data = {
//                     _id: r._id,
//                     email: r.email,
//                 };
//                 next(null, data);
//             }
//         })
//         .catch(err => {
//             console.log("error while retrieving user from auth");
//             next(null, false);
//         });
// }));


// /**
//  * OAuth Strategy Overview
//  *
//  * - User is already logged in.
//  *   - Check if there is an existing account with a provider id.
//  *     - If there is, return an error message. (Account merging not supported)
//  *     - Else link new OAuth account with currently logged-in user.
//  * - User is not logged in.
//  *   - Check if it's a returning user.
//  *     - If returning user, sign in and we are done.
//  *     - Else check if there is an existing account with user's email.
//  *       - If there is, return an error message.
//  *       - Else create a new account.
//  */


// /**
//  * Sign in with Google
//  *  
//  * 

// passport.use(new PassportGoogleStrategy({    
//     clientID:process.env.GOOGLE_ID,
//     clientSecret:process.env.GOOGLE_SECRET,
//     callbackURL:"http://localhost:3000",
// },
//     function(accessToken,refreshToken,profile,done){
//         const usc = new UserController(UserServices);
//         const user = usc.findOneById();
//     }
// ));
// */

// passport.use(new PassportGoogleStrategy(
//     {
//         clientID: process.env.GOOGLE_ID,
//         clientSecret: process.env.GOOGLE_SECRET,
//         callbackURL: "/auth/google/callback"
//     },
//     (req: any, accessToken, profile,done) => {
//         if(profile.id){
//             userRepo.getOne({googleId:profile.id})
//                 .then((existingUser) => {
//                     if(existingUser) {
//                         done(null,existingUser);
//                     }else{
//                         userRepo.create({
//                             googleId:profile.id,
//                             email: profile.emails[0].value,
//                             name: profile.name.familyName + " " + profile.name.givenName
//                         });
//                     }                    
//                 });
//         }
//     }
// ));

// /**
//  * Sign in with Facebook.
//  */
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_ID,
//     clientSecret: process.env.FACEBOOK_SECRET,
//     callbackURL: "/auth/facebook/callback",
//     profileFields: ["name", "email", "link", "locale", "timezone"],
//     passReqToCallback: true
// }, (req: any, accessToken, refreshToken, profile, done) => {
//     if (req.user) {
//         UserModel.findOne({ facebook: profile.id }, (err, existingUser) => {
//             if (err) { return done(err); }
//             if (existingUser) {
//                 req.flash("errors", { msg: "There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account." });
//                 done(err);
//             } else {
//                 UserModel.findById(req.user.id, (err, user: any) => {
//                     if (err) { return done(err); }
//                     user.facebook = profile.id;
//                     user.tokens.push({ kind: "facebook", accessToken });
//                     user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
//                     user.profile.gender = user.profile.gender || profile._json.gender;
//                     user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
//                     user.save((err: Error) => {
//                         req.flash("info", { msg: "Facebook account has been linked." });
//                         done(err, user);
//                     });
//                 });
//             }
//         });
//     } else {
//         UserModel.findOne({ facebook: profile.id }, (err, existingUser) => {
//             if (err) { return done(err); }
//             if (existingUser) {
//                 return done(undefined, existingUser);
//             }
//             UserModel.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
//                 if (err) { return done(err); }
//                 if (existingEmailUser) {
//                     req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." });
//                     done(err);
//                 } else {
//                     const user: any = new UserModel();
//                     user.email = profile._json.email;
//                     user.facebook = profile.id;
//                     user.tokens.push({ kind: "facebook", accessToken });
//                     user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
//                     user.profile.gender = profile._json.gender;
//                     user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
//                     user.profile.location = (profile._json.location) ? profile._json.location.name : "";
//                     user.save((err: Error) => {
//                         done(err, user);
//                     });
//                 }
//             });
//         });
//     }
// }));

// /**
//  * Login Required middleware.
//  */
// export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     const r: BaseResponse = Responses.BAD_REQUEST(msg.USER.NOT_AUTHORIZED);
//     return res.status(r.status).json(r);
// };

// /**
//  * Authorization Required middleware.
//  */
// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//     const provider = req.path.split("/").slice(-1)[0];

//     const user = req.user as UserDocument;
//     if (_.find(user.tokens, { kind: provider })) {
//         next();
//     } else {
//         res.redirect(`/auth/${provider}`);
//     }
// };
