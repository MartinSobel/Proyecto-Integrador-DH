function authMiddleware(req, res, next){
    if (req.session.logged == 'logged'){
        next();
    } else {
        res.render('/login', {msg: 'Please log in first to access this section'});
    }
}

module.exports = authMiddleware;