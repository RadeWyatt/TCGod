//////////////////////////////////////////////////////////////////////////
//IMPORTS AND VARIABLE INITIALIZATIONS
//The following code imports necessary dependencies and initializes
//variables used in the server middleware.
//////////////////////////////////////////////////////////////////////////
import passport from 'passport';
import passportTwitch from 'passport-twitch-new';
import session from 'express-session';
import regeneratorRuntime from "regenerator-runtime";
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const LOCAL_PORT = 8081;
const DEPLOY_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:8081";
const PORT = process.env.HTTP_PORT || LOCAL_PORT;
const TwitchStrategy = passportTwitch.Strategy;
const app = express();
var token = ""

//////////////////////////////////////////////////////////////////////////
//MONGOOSE SET-UP
//The following code sets up the app to connect to a MongoDB database
//using the mongoose library.
//////////////////////////////////////////////////////////////////////////
import mongoose from 'mongoose';

const connectStr = "mongodb+srv://dbAdmin:ZBreTCg72R6acylV@ia7-radewyatt.vcp1c.mongodb.net/appdb?retryWrites=true&w=majority";
mongoose.connect(connectStr, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(
    () =>  {console.log(`Connected to ${connectStr}.`);},
    err => {console.error(`Error connecting to ${connectStr}: ${err}`)}
  );

passport.use(new TwitchStrategy({
  clientID: "19fbkc20uggbz1a7bcka2azyr2clsu",
  clientSecret: "4m1ss0l88dgxw2oxh1mr0bi91hb3o6",
  callbackURL: DEPLOY_URL + "/auth/twitch/callback",
  scope: ["user_read", "chat:edit", "chat:read"]
},
//The following function is called after user authenticates with twitch
async (accessToken, refreshToken, profile, done) => {
    token = accessToken
    console.log("User authenticated through Twitch! In passport callback.");
    return done(null, profile);
}));

//Serialize the current user to the session
passport.serializeUser((user, done) => {
    console.log("In serializeUser.");
    console.log("Contents of user param: " + JSON.stringify(user));
    done(null, user);
});
  
//Deserialize the current user from the session
//to persistent storage.
passport.deserializeUser(function (user, done) {
    done(null, user);
});

app
  .use(session({secret: "tcgod", 
                resave: false,
                saveUninitialized: false,
                cookie: {maxAge: 1000 * 60}}))
  .use(express.static(path.join(__dirname,"client/build")))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json({limit: '20mb'}))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

//AUTHENTICATE route: Uses passport to authenticate with Twitch.
//Should be accessed when user clicks on 'Login with Twitch' button on 
//Log In page.
app.get('/auth/twitch', passport.authenticate('twitch'));

//CALLBACK route:  Twitch will call this route after the
//OAuth authentication process is complete.
//req.isAuthenticated() tells us whether authentication was successful.
app.get('/auth/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/' }),
  (req, res) => {
    console.log("auth/twitch/callback reached.")
    res.redirect("/"); //sends user back to login screen; 
    //req.isAuthenticated() indicates status
  }
);

//LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main app page. req.isAuthenticated() is toggled to false.
app.get('/auth/logout', (req, res) => {
    console.log('/auth/logout reached. Logging out');
    req.logout();
    res.redirect('/');
});

//TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up app state.
app.get('/auth/test', (req, res) => {
    console.log("auth/test reached.");
    const isAuth = req.isAuthenticated();
    if (isAuth) {
        console.log("User is authenticated");
        console.log("User record tied to session: " + JSON.stringify(req.user));
        req.user.token = token
    } else {
        //User is not authenticated
        console.log("User is not authenticated");
    }
    //Return JSON object to client with results.
    res.json({isAuthenticated: isAuth, user: req.user});
});

module.exports = app;