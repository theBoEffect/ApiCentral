import passport from 'passport';
import { BasicStrategy } from 'passport-http'
import user from '../api/users/users';

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('basic', new BasicStrategy(
    async (username, password, done) => {
        try {
            const u = await user.lookup(username, password);
            return done(null, u);
        } catch (error) {
            return done(null, false)
        }
    }
));


export default {
    isAuthenticated: passport.authenticate('basic', { session: false }),
    passport //for testing
};