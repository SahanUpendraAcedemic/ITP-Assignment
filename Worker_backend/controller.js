const User = require('./model');

const getUsers = (req, res, next) => {
    User.find()
    .then(response => {
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    });
};

const addUser = (req,res,next) => {
    const user = new User({
        id:req.body.id,
        name:req.body.name,
        number:req.body.number,
        email:req.body.email,
        address:req.body.address,
        license:req.body.license,
        username:req.body.username,
        password:req.body.password,
       
    });
    user.save()
        .then(response => {
            res.json({response})
        })

        .catch(error =>{
            res.json({error})
        });
}

const updateUser = (req,res,next) => {
    const {id,name,number,email,address,license,username,password} = req.body;
    User.updateOne({id:id}, {$set: {name: name}}, {$set: {number: number}}, {$set: {email: email}}, {$set: {address: address}}, {$set: {license: license}}, {$set: {username: username}}, {$set: {password: password}})
        .then(response => {
            res.json({response})
        })

        .catch(error =>{
            res.json({error})
        });
}

const deleteUser = (req,res,next) =>{
    const id = req.body.id;
    User.deleteOne({id:id})
        .then(response => {
            res.json({response})
        })

        .catch(error =>{
            res.json({error})
        });
}


exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;