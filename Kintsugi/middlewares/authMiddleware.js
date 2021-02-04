function authMiddleware(req, res, next){
    if (req.session.logged == 'logged'){
        res.locals.user = 'user'
        next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = authMiddleware;