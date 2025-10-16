import  mongoose  from 'mongoose';

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://namastedev:lbM71YRgU81s1JDi@namastenode.5aqgnvc.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NamasteNode')
}

