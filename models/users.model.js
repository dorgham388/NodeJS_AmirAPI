var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permissionLevel: {
    type: Number,
    required: true,
    default: 1
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
    User.find({email: email})
      .exec(function(err, user) {
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
