import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User name is required'],
        trim:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'User email is required'],
        unique:true,
        trim:true,
        minlength:10,
        maxlength:50,
        lowercase:true,
        match:[/\S+@\S+\.\S+/,'please fill correct email address']
    },
    password:{
        type:String,
        required:[true,'User password is required'],
        minlength:6
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);
export default User;