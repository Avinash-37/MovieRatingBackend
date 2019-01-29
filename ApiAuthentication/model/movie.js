const mongoose =require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const movieList = mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    actors :{
        type : String
    },
    director :{
        type : String,
        required : true
    },
    date : {
        type : Date , default: Date.now ,
        required: true
    }
});

const Movies = mongoose.model('movies',movieList,'movies');

// Export the model
module.exports = Movies;