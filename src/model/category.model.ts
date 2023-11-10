import mongoose from "mongoose";
import {Schema} from "mongoose"

export interface categoryDocument extends mongoose.Document{
    name : string
    image : string
    created : Date 
}

const categorySchema = new Schema({
    name: {type: String ,required : true , unique : true},
    image : {type : String , required : true},
    created : {type : Date , default : Date.now}
})

const categoryModel = mongoose.model<categoryDocument>("category" , categorySchema)
export default categoryModel