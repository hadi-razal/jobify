import { Employee } from "../models/employeeModel.js";
import { Job } from "../models/jobModel.js";
import slugify from "slugify";


// Creating a job post
export const createJobController = async (req, res) => {
    const { title,
        description,
        location,
        companyName,
        category,
        applicants } = req.body

    const companyId = req.user._id
    const slugCategory = slugify(category)
    try {
        const savedJob = await new Job({
            title,
            description,
            location,
            companyName,
            category,
            applicants,
            companyId,
            slugCategory
        }).save()
        res.send({ savedJob, message: "Job added successfully" });
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).send("Error saving job");
    }
}


// Update the job 
export const jobUpdateController = async (req, res) => {
    const { jobId } = req.params;
    const { title, description, location, category } = req.body;

    const slugCategory = slugify(category)
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, description, location, category, slugCategory },
            { new: true }
        );
        if (!updatedJob) {
            return res.status(404).json({ message: "Unable to Update" });
        }
        res.send({ updatedJob, message: "Job updated succesfully" });

    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Error updating job" });
    }
}


// delete a job post
export const deleteJobController = async (req, res) => {
    const { jobId } = req.params;
    try {
        const deleteJob = await Job.findByIdAndDelete(jobId)

        if (!deleteJob) {
            return res.status(404).json({ message: "Unable to delete " });
        }
        res.status(200).json({ message: "Deleted Successfully" });
        res.json(deleteJob);
    } catch (error) {
        console.error("Error Deleting job:", error);
        res.status(500).json({ message: "Error Deleting job" });
    }
}

// get all job controllers
export const getAllJobController = async (req, res) => {
    try {
        const jobs = await Job.find()
        res.status(200).send({ jobs, success: true, message: "Fetched all job posts succesfully" })
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: "error while fetching job posts" })
    }
}

// total applicants for the job
export const totalJobApplicantsController = async (req, res) => {
    try {
        const { jobId } = req.params
        const jobs = await Job.findById(jobId).populate("applicants")
        res.send(jobs);
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).send("Error saving job");
    }
}

// Apply for job this will save the user id in job databasse and user database
export const applyForJobController = async (req, res) => {
    // from middleware
    const userId = req.user._id;
    const { jobId } = req.params;
    try {
        const job = await Job.findOne({ _id: jobId });
        await job.applicants.push(userId);
        await job.save();
        const employee = await Employee.findById(userId);
        await employee.appliedJobs.push(jobId);
        await employee.save();

        res.send({ success: true, message: "Applied for the job successfully", job });
    } catch (error) {
        console.error(error);
        res.send({ success: false, message: "Error in applying for the job" });
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


// get all jobs from a single company
export const getCompanyJobsController = async (req, res) => {
    try {
        const companyId = req.user._id
        const jobs = await Job.find({ companyId })
        res.send({ jobs, message: "Jobs Fetched successfully" })
        res.send()
    } catch (error) {
        console.log(error);
        res.send({ message: "Error in getting single company jobs" });
    }
}