import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js"

// Saving a Job
export const saveJobController = async (req, res) => {
    const { jobId } = req.params;
    const userId = req.user._id
    try {
        const user = await User.findById({ _id: userId });
        user.savedJobs.push(jobId);
        user.save();
        res.send({ message: "Job Saved" });
    } catch (error) {
        console.error(error);
        res.send({ message: "Error in saving job" });
    }
};

// get all saved jobs
export const getAllSavedJobs = async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById({ _id: userId });
        const savedJobs = await user.populate("savedJobs")
        res.send({ savedJobs, message: "Fetcehd all jobs successfully" });
    } catch (error) {
        console.error(error);
        res.send({ message: "Error in saving job" });
    }
};

// Apply for job
export const applyForJobController = async (req, res) => {
    const userId = req.user._id;
    const { jobId } = req.params;
    try {
        const job = await Job.findOne({ _id: jobId });
        await job.applicants.push(userId);
        await job.save();

        res.send({ message: "Applied for the job successfully", job });
    } catch (error) {
        console.error(error);
        res.send({ message: "Error in applying for the job" });
    }
};

// get jobs based on category
export const getJobCategoryBasedController = async (req, res) => {
    const { category } = req.params
    try {
        const catBasedJobs = await Job.find({ category })
        res.send({ catBasedJobs, message: "fetched job based on category" })
    } catch (error) {
        console.log(error)
        res.send({ message: "Error in getting categorized job" });
    }
}

