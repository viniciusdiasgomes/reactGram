const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const jwtSecret = 'thisisoursecret';

//GENERATE USER TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret,
    {expiresIn: "7d"} 
    )
};


//REGISTRAR USER AND SIGN IN 
const register = async(req, res) => {
    
    const {name, email, password} = req.body

    //check if user exists
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]})
      return
    }

    //Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHah = await bcrypt.hash(password, salt)

    // Create use
    const newUser = await User.create({
        name,
        email,
        password:passwordHah
    })


    // if user was createdsuccesfully, return the token
    if(!newUser) {
        res.status(422).json({errors:["houve um erro, por favor tente mais tarde"]})
        return
    }
    res.status(201).json({
        _id:newUser.id,
        token: generateToken(newUser._id),
    })

};

//sign user in
const login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

//check if user exists
if(!user) {
    res.status(404).json({errors:["usuario nao encontrado" ]})
    return
}

//check if password matches
if (!(await bcrypt.compare(password, user.password))){
    res.status(422).json({errors:"Senha Invalida"})
    return
}

//return user with token
res.status(201).json({
    _id: user.id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
})

}

//get current logged in user
const getCurrentUser = async(req, res) =>{
    const user = req.user

    res.status(200).json(user);
};

//update an user
const update = async(req, res) => {
   const {name, password, bio} = req.body

    let profileImage = null

    if(req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user

    // Tá quebrando na linha de baixo

    // const user = await User.findById(mongoose.Types.ObjectId(reqUser._id).select("-password"))
    // TypeError: Cannot read properties of undefined (reading '_id')
    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id).select("-password"))

    if(name){
        user.name = name
    }

    
    if(password){
        const salt = await bcrypt.genSalt()
        const passwordHah = await bcrypt.hash(password, salt)

        user.password = passwordHash
    }

    if(profileImage){
        user.profileImage = profileImage
    }

    if(bio){
        user.bio = bio
    }

    await user.save()
    res.status(200).json(user);

}

//get user by id 
const getUserById = async(req, res) => {
const {id} = req.params

try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")

    
///=check if user exists
if(!user){
    res.status(404).json({errors:["usuario nao encontrado"]})
    return
}

res.status(200).json(user);

} catch (error) {
    res.status(404).json({errors:["usuario nao encontrado"]})
    return;
}

res.status(200).json(user);
}


module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};