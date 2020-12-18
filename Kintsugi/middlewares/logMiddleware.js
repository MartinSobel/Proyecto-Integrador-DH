function logMiddleware(req, res, next){
    if (req.session.logged != 'logged'){
        next();
    } else {
        res.redirect('/users/profile');
    }
}

module.exports = logMiddleware;