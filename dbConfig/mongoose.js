var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/AlloVoisins_DB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

module.exports = { mongoose };
