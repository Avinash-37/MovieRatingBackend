const mongoose =require('mongoose');

const movierating = mongoose.Schema({
    movieName :{
        type : String,
        required : true
    },
    comment :{
        type : String
    },
    star :{
        type : Number,
        max : 5,
        default : 5
    },
    commentedBy : {
        type:String
    },
    date : {
        type : Date , default: Date.now ,
        required: true
    }
});

const Moviesrating= mongoose.model('moviesrating',movierating,'moviesrating');

// Export the model
module.exports = Moviesrating;