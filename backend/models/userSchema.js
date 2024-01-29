import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    isWorker:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})


const User = mongoose.model("User", userSchema);
export default User;