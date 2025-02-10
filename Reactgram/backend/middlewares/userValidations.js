const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
        .isString()
        .withMessage("o nome é obrigatorio")
        .isLength({min: 3})
        .withMessage("o nome precisa ter no minimo 3 caracteres."),
        body("email")
        .isString()
        .withMessage("o email é obrigatorio")
        .isEmail()
        .withMessage("insira um email valido"),
        body("password")
        .isString()
        .withMessage("A senha é obrigatorio")
        .isLength({min: 5})
        .withMessage("A senha precisa ter no minimo 5 caracteres."),
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas não conferem.");
                }
                return true;
            }),
    ];
};


    const loginValidation = () => {
        return [
            body("email")
            .isString()
            .withMessage("o email obrigatorio")
            .isEmail()
            .withMessage("insira um email valido"),
            body("password")
            .isString()
.withMessage("a senha é obrigatoria")



]
    }

module.exports = {
    userCreateValidation,
     loginValidation,
}