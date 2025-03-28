const { body } = require("express-validator");

const photoInsertValidation = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("O título é obrigatório.")
            .isString()
            .withMessage("O título deve ser um texto.")
            .isLength({ min: 3 })
            .withMessage("O título precisa ter no mínimo 3 caracteres."),
        
        body("image").custom((_, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória.");
            }
            return true;
        }),
    ];
};

    const photoUpdateValidation = () => {
        return[
            body("title")
            .optional()
            .isString()
            .withMessage("O titulo é obrigatorio")
            .isLength({ min: 3 })
            .withMessage("O título precisa ter no mínimo 3 caracteres.")
        ]
    }


    const commentValidation = () => {
        return [
            body("comment").isString().withMessage("O comentario é obrigatorio")
        ]
    }
    
module.exports = {
     photoInsertValidation,
     photoUpdateValidation,
     commentValidation,
     };
