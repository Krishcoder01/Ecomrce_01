const mongoose = require('mongoose');

const dbSetup = () => {
  mongoose.connect(process.env.MONGO_DB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to the database 🚀🚀');
  }).catch((err) => {
    console.log('Error connecting to the database ❌', err);
  });
};

module.exports = dbSetup;

