import mongoose from "mongoose";

const collection = 'Messages';

const schema = new mongoose.Schema({
    user:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    }
});
const messagesModel = mongoose.model(collection, schema);
export default messagesModel;