const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require("bcrypt");

const configurationSecrets = require("../config/constants");
const db = require("../config/db.config");
const user = db.user;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      //Assume there is a DB module providing a global UserModel
      return user
        .findOne({
          where: { email, password },
        })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }

          return cb(null, user, {
            message: "Logged In Successfully",
          });
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: configurationSecrets.jwtSecretKey,
    },
    function (jwtPayload, cb) {
      //find the user in db if needed
      return user
        .findOne({
          where: { email: jwtPayload.email },
        })
        .then(async (user) => {
          const match = await bcrypt.compare(jwtPayload.password, user.password);

          if (match) {
            return cb(null, user);
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          return cb(null, false, { err: "invalid password" });
        });
    }
  )
);
