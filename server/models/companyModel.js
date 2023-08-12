import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    bannerImg: { type: Buffer },
    description: { type: String },
    image: { type: Buffer },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyEstablishedYear: { type: Number, required: true },
    role: { type: String, required: true, default: 'company' },
    savedProfile: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
}, { timestamps: true })

export const Company = mongoose.model.companies || mongoose.model("companies", companySchema)
