var jwt = require("jsonwebtoken");
const validator = require("validator");
const isEmpty = require("./isEmpty");
const isPhone = require("./isPhone");

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(
          authorization[1],
          "I AM NOT YOUR ENEMY, I AM THE ENEMY"
        );
        console.log(req.jwt);
        return next();
      }
    } catch (err) {
      return res.status(403).send("Valid request with an invalid token");
    }
  } else {
    return res.status(401).send("Invalid request");
  }
};

exports.validateRegisterInput = (req, res, next) => {
  let errors = {};
  let data = {
    email: req.body.email,
    firstName: req.body.userIdentity.firstName,
    phone: req.body.userIdentity.phone,
    address: req.body.userAdress.address,
    status: req.body.userStatus.status
  };
  let entries = Object.entries(data);

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email format";
  }
  if (!isPhone(data.phone)) {
    errors.phone = "Invalid phone number";
  }
  for (const [key, value] of entries) {
    if (isEmpty(value)) {
      errors[`${key}`] = key + " is Required";
    }
  }
  console.warn(errors);
  if (isEmpty(errors)) {
    next();
  } else {
    return res.status(400).send({ errors: errors });
  }
};
