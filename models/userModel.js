const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

const fields = {
	'name' : {
    type : String,
    required : true 
  },
	'email' : {
    type : String,
    //required : true
  },
	'password' : {
    type : String,
    required : true
  },
	'createdAt' : {
    type : Date,
    default : Date.now() 
  },
  'permissao': String,
	'active' : {
    type : Boolean,
    default : true
  },
  'resetPasswordToken' : String,
  'resetPasswordExpires' : Date
}

let userSchema = new Schema(fields);

userSchema.pre('save', function (next) {
  let cliente = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(cliente.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        cliente.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('user', userSchema);
