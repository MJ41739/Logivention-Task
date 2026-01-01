import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors("*"));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("mongodb connected"))
    .catch(err => console.log(err));

app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/admin', (await import('./routes/admin.js')).default);
app.use('/api/user', (await import('./routes/user.js')).default);
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000");
});

async function createAdminUser(){
    const adminExists = await User.findOne({role: 'admin'});
    if(!adminExists){
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name:"Admin", 
            email:"admin@gmail.com",
            password: hashedPassword,
            role: 'admin'
        })
        console.log("Admin user created with email: admin@gmail.com");
    }
}
createAdminUser();