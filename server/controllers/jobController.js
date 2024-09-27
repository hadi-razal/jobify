import { Employee } from "../models/employeeModel.js";
import { Job } from "../models/jobModel.js";
import slugify from "slugify";


// Creating a job post
export const createJobController = async (req, res) => {
    const { title,
        description,
        location,
        salary,
        companyName,
        workExperience,
        category } = req.body

    if (!title || !description || !location || !companyName || !workExperience || !category) {
        return res.send({ success: false, message: "Fill in all required inputs" });
    }

    const companyId = req.user._id
    const slugCategory = slugify(category)
    try {
        const savedJob = await new Job({
            title,
            description,
            location,
            salary,
            companyName,
            category,
            companyId,
            workExperience,
            slugCategory
        }).save()
        res.send({ success: true, savedJob, message: "Job added successfully" });
    } catch (error) {
        console.error("Error saving job:", error);
        res.status(500).send({ success: false, message: "Error saving job" });
    }
}


// Update the job 
export const jobUpdateController = async (req, res) => {
    const { jobId } = req.params;
    const { title, description, salary, location, category } = req.body;

    const slugCategory = slugify(category)
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, salary, description, location, category, slugCategory },
            { new: true }
        );
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: "Unable to Update" });
        }
        res.send({ updatedJob, success: true, message: "Job updated succesfully" });

    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ success: false, message: "Error updating job" });
    }
}


// delete a job post
export const deleteJobController = async (req, res) => {
    const { jobId } = req.params;
    try {
        const deleteJob = await Job.findByIdAndDelete(jobId)

        if (!deleteJob) {
            return res.status(404).json({ success: false, message: "Unable to delete " });
        }
        res.status(200).json({ success: true, message: "Deleted Successfully" });
    } catch (error) {
        console.error("Error Deleting job:", error);
        res.status(500).json({ success: false, message: "Error Deleting job" });
    }
}

// Get all job postings
export const getAllJobController = async (req, res) => {
    try {
        const jobs = await Job.find({});

        // If no jobs found
        if (jobs.length === 0) {
            return res.status(404).send({ success: false, message: "No job posts found" });
        }
        res.status(200).send({ jobs, success: true, message: "Fetched all job posts successfully" });
    } catch (error) {
        console.error("Error fetching job posts:", error);
        res.status(500).send({ success: false, message: "Error while fetching job posts" });
    }
};

// get all job from a single company 
export const getSingleCompanyJobsController = async (req, res) => {
    try {
        const { companyId } = req.params
        const jobs = await Job.find({ companyId: companyId })
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
    const userId = req.user._id;
    const { jobId } = req.params;

    try {
        const job = await Job.findOneAndUpdate(
            { _id: jobId },
            { $addToSet: { applicants: userId } },
            { new: true }
        );
        const employee = await Employee.findByIdAndUpdate(
            userId,
            { $addToSet: { appliedJobs: jobId } },
            { new: true }
        );
        res.send({
            success: true,
            message: "Applied for the job successfully",
            job,
        });
    } catch (error) {
        console.error(error);
        res.send({
            success: false,
            message: "Error in applying for the job",
        });
    }
};


export const removeApplicationForJobController = async (req, res) => {
    const userId = req.user._id;
    const { jobId } = req.params;

    try {
        const job = await Job.findByIdAndUpdate(
            jobId,
            { $pull: { applicants: userId } },
            { new: true }
        );
        const employee = await Employee.findByIdAndUpdate(
            userId,
            { $pull: { appliedJobs: jobId } },
            { new: true }
        );
        res.send({
            success: true,
            message: "Removed application for the job successfully",
            job,
        });
    } catch (error) {
        console.error(error);
        res.send({
            success: false,
            message: "Error in removing application for the job",
        });
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
    const { keyword, category } = req.query;
    try {
        // Build the search query based on provided criteria
        const matchQuery = {};

        if (keyword) {
            matchQuery.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ];
        }
        if (category && category !== "all") {
            matchQuery.category = category;
        }
        const searchResults = await Job.aggregate([
            { $match: matchQuery }
        ]);
        res.send({ success: true, searchResults });
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Error in Search" });
    }
};

// get all jobs from a single company
export const getCompanyJobsController = async (req, res) => {
    try {
        const companyId = req.user._id;
        console.log(companyId)
        const jobs = await Job.find({ companyId: companyId }); // Change this line
        res.send({ jobs, message: "Jobs Fetched successfully" });
    } catch (error) {
        console.log(error);
        res.send({ message: "Error in getting single company jobs" });
    }
};


// get the total number or jobs posted and the combined total number of applicants 
export const getJobsStatusController = async (req, res) => {
    try {
        const companyId = req.user._id;
        const jobs = await Job.find({ companyId })

        let totalJobs = 0;
        const jobsWithApplicantsCount = [];
        for (const job of jobs) {
            const applicantsCount = job.applicants.length;
            totalJobs++;
            jobsWithApplicantsCount.push({
                _id: job._id,
                title: job.title,
                applicantsCount: applicantsCount
            });
        }

        res.send({
            success: true,
            totalJobs: totalJobs,
            jobsWithApplicantsCount: jobsWithApplicantsCount
        });

        // res.send({ jobs, success: true })
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: "Error in getting job's status" });
    }

};

// get all the applicants from the job 
export const populateApplicantsController = async (req, res) => {
    try {
        const { jobId } = req.params
        const jobs = await Job.findById({ _id: jobId }).populate("applicants");
        res.send({ jobs, message: "Jobs Fetched all applicants", applicants: jobs.applicants || [] });
    } catch (error) {
        console.log(error);
        res.send({ message: "Error in getting all applicants from jobs" });
    }
};