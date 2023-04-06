import mongoose from 'mongoose';

const connection = {}

export const connectDatabase = async () => {
    await mongoose.connect('mongodb+srv://riteshbmsingh:eoabY6LM30n6mzZi@cluster0.cay8nvi.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log("connected")
        })
        .catch((err) => console.log(err));
}
