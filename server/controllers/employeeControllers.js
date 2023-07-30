import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js"
import slugify from "slugify"


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
    const slugCategory = slugify(category)
    try {
        const catBasedJobs = await Job.find({ slugCategory })
        res.send({ catBasedJobs, message: "fetched job based on category" })
    } catch (error) {
        console.log(error)
        res.send({ message: "Error in getting categorized job" });
    }
}

// fetch data for single page
export const singleJobPageController = async (req, res) => {
    const { jobId } = req.params
    try {
        const sPage = await Job.findById({ _id: jobId })
        res.send({ sPage, message: "page Fetched successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error fetching job for single page");
    }
}


//job search 
export const jobSearchController = async (req, res) => {
    const { keyword, category, location, minSalary, maxSalary } = req.body;
    try {
        // Build the search query based on provided criteria
        const matchQuery = {};

        if (keyword) {
            matchQuery.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ];
        }
        if (category) {
            matchQuery.category = category;
        }
        if (location) {
            matchQuery.location = location;
        }
        if (minSalary || maxSalary) {
            matchQuery.salary = {};
            if (minSalary) {
                matchQuery.salary.$gte = minSalary;
            }
            if (maxSalary) {
                matchQuery.salary.$lte = maxSalary;
            }
        }
        console.log(matchQuery)
        // Execute the aggregation pipeline using the Job model
        const searchResults = await Job.aggregate([
            { $match: matchQuery }
        ]);
        res.send({ results: searchResults });
    } catch (error) {
        console.log(error);
        res.send({ message: "Error in Search" });
    }
};
