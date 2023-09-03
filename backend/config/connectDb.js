const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected ${connect.connection.host}`); // à la place de connect en peut utiliser mongoose
  } catch (err) {
    console.log(`Database Error ${err}`);
    process.exit(1);
  }
};
// use can use this method it is async function
// const connectDB = mongoose
//   .connect(process.env.MONGO_URI)
//   .then((con) => console.log(con.connection.host))
//   .catch((err) => console.log(err));

module.exports = connectDB;
