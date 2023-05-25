import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    age: Number,
    email:String,
    password:String,
    rol:String
})

const userModel = mongoose.model(collection, schema);

export default userModel;
