import mongoose from "mongoose";
import {Schema} from "mongoose"

export interface brandDocument extends mongoose.Document{
    name : string
    image : string
    created : Date 
}

const brandSchema = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    created : {type : Date , default : Date.now}
})

const brand = mongoose.model<brandDocument>("brand" , brandSchema)
export default brand