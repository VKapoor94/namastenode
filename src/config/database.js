import  mongoose  from 'mongoose';

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://kapoorvinit94_db_user:Q5o8FAfWJYBgheKW@namestenode.e0rtxoz.mongodb.net/?appName=NamesteNode')
}
