const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = (req, res, next) => {
    
    try {
        let token = req.cookies.token;
        if (token) {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        return next();
    } else {
        return res.status(201).redirect('/user/login');
    }
    } catch (error) {
        next(error);
    }
}


module.exports.isAdmin = (req, res, next) => {
    try {
        let token = req.cookies.token;
    if (token) {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user)
        if (user.isAdmin) {
            req.user = user;
            return next();
        } else {
            return res.status(201).redirect('/user/admin');
        }
    } else {
        return res.status(201).redirect('/user/admin');
    }
    } catch (error) {
        next(error);
    }
}



