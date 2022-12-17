exports.login = (req, res)=>{
    res.json({msg:'user login'});
}

exports.register = (req, res)=>{
    res.json({msg:'user register'});
}

exports.getMe = (req, res)=>{
    res.json({msg:`this me`});
}

exports.logout = (req, res)=>{
    res.json({msg:'user logout'});
}