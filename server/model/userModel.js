import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
        name:{
                type:String,
                required : true
        },
        email:{
                type:String,
                required : true
        },
        address:{
                type:String,
                required : true
        },
        // mobile:{
        //         type:String,
        //         required : true
        // },
        // pincode:{
        //         type:String,
        //         required : true
        // },
        // Birthdate:{
        //         type:String,
        //         required : true
        // },
        // age:{
        //         type:String,
        //         required : true
        // },
        // skills:{
        //         type:String,
        //         required : true
        // }
})

export default mongoose.model("Users", userSchema)