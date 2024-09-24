import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    password: { type: String, required: true },
    // workExperience: { type: Number, required: true },
    description: { type: String },
    resumeURL: { type: String },
    location: { type: String },
    // education: { type: String, required: true },
    role: { type: String, default: 'employee' },
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }],
    appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'jobs' }]
}, { timestamps: true })

export const Employee = mongoose.model.users || mongoose.model("users", userSchema)