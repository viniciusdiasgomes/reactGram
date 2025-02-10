const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

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

}


module.exports = {
    register,
    login,
};