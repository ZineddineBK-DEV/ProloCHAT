import mongoose from "mongoose";

const connect = (url) => {
  mongoose.set("strictQuery", true);
  return mongoose
    .connect(url,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connection Established!😁`))
    .catch((error) => console.log(`Connection Error ${error}`));
};

export default connect;
