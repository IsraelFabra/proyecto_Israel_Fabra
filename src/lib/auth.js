// Usuario registrado 'isLoddedIn' que indica si el usuario está registrado

module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    }
};

