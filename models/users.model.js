var mongoose = require("mongoose");

const userStatusSchema = mongoose.Schema({
  status: {
    type: String
    // required: true
  },
  professionalSituation: {
    type: String
  },
  Profession: {
    type: String
  }
});
const userAdressSchema = mongoose.Schema({
  cp: {
    type: Number
  },
  city: {
    type: String
  },
  street: {
    type: String
  },
  address: {
    type: String
    // required: true
  }
});
const userIdentitySchema = mongoose.Schema({
  firstName: {
    type: String
    // required: true
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
    // required: true
  },
  gender: {
    type: String
  },
  birthDate: {
    type: String
  },
  Biography: {
    type: String
  }
});
const userSchema = mongoose.Schema({
  email: {
    type: String
    // required: true
  },
  password: {
    type: String
    // required: true
  },
  shouldReceiveInformations: {
    type: Boolean,
    default: false
  },
  permissionLevel: {
    type: Number,
    default: 1
  },
  userIdentity: {
    type: userIdentitySchema
  },
  userAdress: {
    type: userAdressSchema
  },
  userStatus: {
    type: userStatusSchema
  }
});

const User = mongoose.model("Users", userSchema);
//-------------------------------------------------------
exports.createUser = userData => {
  const user = new User(userData);
  return user.save().catch(e => console.log(e.message));
};
//-------------------------------------------------------
exports.findById = id => {
  return User.findById(id).then(result => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};
//-------------------------------------------------------
exports.findByEmail = email => {
  return new Promise((resolve, reject) => {
    User.find({ email: email }).exec(function(err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
//-------------------------------------------------------
exports.patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    User.findById(id, function(err, user) {
      if (err) reject(err);
      else {
        for (let i in userData) {
          user[i] = userData[i];
        }
        user.save(function(err, updatedUser) {
          if (err) return reject(err);
          resolve(updatedUser);
        });
      }
    });
  });
};
//-------------------------------------------------------
exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function(err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};
//-------------------------------------------------------
exports.removeById = userId => {
  return new Promise((resolve, reject) => {
    User.deleteOne({ _id: userId }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
