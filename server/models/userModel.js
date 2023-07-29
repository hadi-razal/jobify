import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workExperience: { type: Number, required: true },
    education: { type: String, required: true },
    role: { type: String, required: true, enum: ["company", "employee"], default: 'employee' },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }]
})

export const User = mongoose.model.users || mongoose.model("users", userSchema)