const user = require("../models/user")

module.exports=(req,res,next)=>{
    if(!user.isLoggedIn)
    {
        res.redirect('/login')
    }
    next();
}