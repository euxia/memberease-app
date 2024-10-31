import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  member: String,
  description: String,
  qrID: String, 
}, {
  timestamps: true 
});


const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;