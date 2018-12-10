var mongoose = require('mongoose');
var UserSchema= mongoose.Schema;

var bcrypt = require('bcryptjs');

var newUser = new UserSchema({
    username :{type: String , index:true},
    firstname: {type: String},
    lastname: {type: String},
    password:{type :String},
    email :{type:String},
});

var User = module.exports = mongoose.model('Users',newUser);
module.exports.createUser=function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback)
        });
    });
};

module.exports.getUserByName= function(username, callback){
    var query ={ username :username};
    User.findOne(query,callback);
};

module.exports.getUserById= function(id, callback){

    User.findById(id,callback);
};



//used to compare the password, first of decrpting it

module.exports.comparePassword = function(candidatePassword, hash ,callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
};