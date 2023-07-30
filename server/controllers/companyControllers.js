import { Job } from "../models/jobModel.js";
import slugify from "slugify";


// Creating a job post
export const createJobController = async (req, res) => {
    const { title,
        description,
        location,
        company,
        category,
        applicants } = req.body
    const slugCategory = slugify(category)
    try {
        const savedJob = await new Job({
            title,
            description,
            location,
            company,
            category,
            applicants,
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
