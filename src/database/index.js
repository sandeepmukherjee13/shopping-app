import mongoose from 'mongoose';

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectToDB = async () => {
  const connectionUrl =
    'mongodb+srv://sandeepmukherjee21:8498086749@cluster3.pssrftc.mongodb.net/';
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() =>
      console.log('shopping application database connected successfully')
    )
    .catch((err) =>
      console.log(`getting error from db connection ${err.message}`)
    );
};

export default connectToDB;
