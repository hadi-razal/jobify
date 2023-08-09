import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    company: { type: String, required: true },
    salary: { type: Number },
    category: {
        type: String,
        required: true,
        deafult: "none",
        enum: [
            "Information Technology",
            "Software Development",
            "Data Science",
            "Web Development",
            "Mobile App Development",
            "Artificial Intelligence (AI) and Machine Learning (ML)",
            "Cybersecurity",
            "Digital Marketing",
            "Content Writing",
            "Graphic Design",
            "UX / UI Design",
            "Sales and Marketing",
            "Finance and Accounting",
            "Human Resources (HR)",
            "Customer Support",
            "Project Management",
            "Business Development",
            "Healthcare and Medicine",
            "Education and Teaching",
            "Engineering",
            "Engineering (Mechanical, Electrical, Civil, etc.)",
        ],
    },
    slugCategory: { type: String, required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], // This will store an array of user references who applied to the job
    jobSavedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] // This will store an array of user references who saved  the job
}, { timestamps: true });

export const Job = mongoose.model.jobs || mongoose.model("jobs", JobSchema);
