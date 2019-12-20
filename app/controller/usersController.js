const User=require('../models/user')

module.exports.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then(user=>{
        const { _id,username,email}=user
        res.json({_id,username,email})
        // res.json(user)

        // res.json(_.pick(user,["_id","username","ema"]))
    })
    .catch(err=>{
        res.json(err)
    })
}

module.exports.login=(req,res)=>{
    const body=req.body

    User.findByCredentials(body.email,body.password)
        .then(user=>{
            // res.json(user)
            return user.generateToken()
        })
        .then((token)=>{
            // res.setHeader('x-auth',token).send({})
            res.send({'token':token})
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports.account=function(req,res){
    const user=req.user
    const { _id,username,email}=user
    res.json({_id,username,email})
    // res.json(_.pick(user,["_id","username","email"]))

}

module.exports.logout=function(req,res){
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(function(){
        res.send({notice:'successfully logged out'})
    })
    .catch(function(err){
        res.send(err)
    })
}