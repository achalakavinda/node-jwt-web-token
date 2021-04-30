const Joi = require('Joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('./../model/User')

const userCreateValidateScheme = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required()
});

const userCheckValidateScheme = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required()
});


router.post('/register', (req,res) => {
    
    const validationResult = userCreateValidateScheme.validate(req.body);

    if(validationResult.error)
        return  res.status(400).send(validationResult.error);

    const hashPassowrd  = bcrypt.hashSync(req.body.password,10);
    
    const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hashPassowrd
    });

    user.save().then(data=>{
        res.status(200).send(data)
    });
});


router.post('/login', (req,res) => {
    
    const validationResult = userCheckValidateScheme.validate(req.body);

    if(validationResult.error)
        return  res.status(400).send(validationResult.error);

    const hashPassowrd  = bcrypt.hashSync(req.body.password,10);
    
    User.findOne({email:req.body.email}, function (err, user) {
        if (err)
        return res.status(400).send(err);

        if(user){
            const token = jwt.sign({_id:user._id},'token_secreat');
                res.header('auth-token',token);
            return res.status(200).send({
                user:user,
                _token:token
            });
        }
        return res.status(400).send("unknown user");
    });

});


module.exports = router;