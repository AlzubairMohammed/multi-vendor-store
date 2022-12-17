const User = require('../models/User');

exports.getUsers = (req, res)=>{
    User.findAll({
        include:['products']
    })
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
}

exports.createUser = (req, res)=>{
    res.json({msg:`user created`});
}

exports.updateUser = (req, res)=>{
    res.json({msg:`user ${req.params.id} updated`})
}

exports.deleteUser = (req, res)=>{
    res.json({msg:`user ${req.params.id}`});
}