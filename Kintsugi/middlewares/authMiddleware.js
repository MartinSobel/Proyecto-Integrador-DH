function authMiddleware(req, res, next){
    if (req.session.logged == 'logged'){
        next();
    } else {
        res.redirect('/users/login');
    }
}

module.exports = authMiddleware;