const mongoose =require('mongoose');

const Schema =mongoose.Schema;

const movieList = new Schema({
    id:{
        type : String
    },
    name :{
        type : String,
        required : true
    },
    date : {
        type : Date,
        required: true
    }
});

const Movies = mongoose.model('movies',movieList);

// Export the model
module.exports = Movies;