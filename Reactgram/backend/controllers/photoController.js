const Photo = require("../models/photos")
const User = require("../models/User")
const mongoose = require("mongoose")


//insert a photo, with an user related to it
const insertPhoto = async(req, res) => {
    const {title} = req.body;
    const image = req.file.filename;

    const reqUser = req.user 
    
    const user = await User.findById(reqUser._id);

    //create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user._name,
    });

    //if photo was created sucess
    if(!newPhoto){

        res.status(422).json({
            errors:["houve um problema, porfavor tente novamente mais tarde"],
        })
        return;
    }
    res.status(201).json(newPhoto)

    console.log(req.body);

    res.send("Photo insert")
}

//remove the photo
const deletePhoto = async(req, res) => {

    const {id} = req.params

    const reqUser = req.user

    try {
        const photo = await photo.findById(mongoose.Types.ObjectId())

        // check if photo exists
        if(!photo) {
            res.status(404).json({errors: ["Foto nao encontrada"]})
            return;
        }
    
    
        //check if photo belongs to user
        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors:["Ocorreu um erro, tente novamente mais tarde"]})
        }
    
        await Photo.findByIdAndDelete(photo._id);

        res.status(200)
        .json({ id: photo._id, message: "foto excluida com sucesso"})
    
    } catch (error) {
        res.status(404).json({ errors: ["Foto excluida com sucesso"]})
    
    }

}

//get all photos
const getAllPhotos = async(req, res) => {

const photos = await Photo.find({})
.sort([["createdAt", -1]])
.exec();

return res.status(200).json(photos)

}


//get user photos
const getUserPhotos = async(req, res) => {

    const {id} = req.params

    const photos = await Photo.find({userId: id })
        .sort([['createdAt', -1 ]])
        .exec()

return res.status(200).json(photos)

}

//get photo by id
const getPhotoById = async (req, res) => {

    const{id} = req.params

    const photo =  await Photo.findById(mongoose.Types.ObjectId(id))

    //check if photo exists
    if(!photo){
        res.status(404).json({errors:["Foto nao encontrada"]})
        return
    }
    res.status(200).json(photo)

}

// Update a photo
const updatePhoto = async(req, res) => {

    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user

    const photo =await Photo.findById(id)


    //check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto nao encontrada"]})
        return
    }

    //check if photo belongs to user

    if(!photo.userId.equals(reqUser._id)){
        res.status(422).json({errors: ["Ocorreu um erro, porfavor tente mais tarde"]})
        return
    }


    if(title){
       photo.title = title 
    }

    await photo.save()
    res.status(200).json({photo, message:"Foto atualizada com sucesso"})
}

//like functionality
const likePhoto = async (req, res) => {
    const {id} = req.params

    const reqUser = req.user

    const photo = await Photo.findById(id)

  //check if photo exists
    if(!photo){
        res.status(404).json({errors: ["Foto nao encontrada"]})
        return
    }

    // check if user alredy liked the photo
    if(photo.likes.includes(reqUser._id)) {
        res.status(422).json({errors:["voce ja curtiu a foto"]})
        return
    }

    //put user id in likes array
    photo.likes.push(reqUser._id)

    photo.save()

    res
    .status(200)
    .json({photoId: id, userid:reqUser._id, message:"A foto foi curtida"})
}


// coment functionality
const commentPhoto = async (req,res) => {

    const {id} = req.params
    const {comment} = req.body

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    const photo = await Photo.findById(id)

     //check if photo exists
     if(!photo){
        res.status(404).json({errors: ["Foto nao encontrada"]})
        return
    }


    // put comment in the array of comments
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    }

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json
    ({
        comment: userComment,
        message: "O comentario foi adicionado"
    })
}

//search photos by title
const searchPhotos = async(req, res) => {
    const {q} = req.query
    const photos = await Photo.find({title: new ReqExp(q, "i")}).exec()
    res.status(200).json(photos)

} 



module.exports = {
 insertPhoto, 
 deletePhoto,
 getAllPhotos,
 getUserPhotos,
 getPhotoById,
 updatePhoto,
 likePhoto,
 commentPhoto,
 searchPhotos,
};