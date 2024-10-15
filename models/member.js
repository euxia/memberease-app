import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  member: String,
  description: String,
  // Add qr code field later
  // image: String, // Add image field later
}, {
  timestamps: true 
});


const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;