import { Employee } from "../models/employeeModel.js"
import { Job } from "../models/jobModel.js"
import { hashPassword } from "../helpers/hashPassword.js"
import { Company } from "../models/companyModel.js";


// Creating an account for jobify 
export const registerEmployeeController = async (req, res) => {
    try {
        const { name, email, password, workExperience, education } = req.body;
        const isCompanyEmailExist = await Company.findOne({ email });
        const isEmployeeEmailExist = await Employee.findOne({ email });

        const lowerCaseEmail = email.toLowerCase()

        if (isCompanyEmailExist) {
            return res.send({ success: false, message: "Email is already use in employee account" });
        }
        if (isEmployeeEmailExist) {
            return res.send({ success: false, message: "Email is already in use" });
        }

        const hashedPassword = await hashPassword(password)
        const newEmployee = await new Employee({
            name,
            email: lowerCaseEmail,
            password: hashedPassword,
            workExperience,
            education,
        }).save();

        res.send({ newEmployee, success: true, message: "Employee Account created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error registering Employee" });
    }
};


// Saving a Job to employee database
export const saveJobController = async (req, res) => {
    const { jobId } = req.params;

    // from the middleware
    const userId = req.user._id
    try {

        // saving job id to user database 
        const employee = await Employee.findById({ _id: userId });
        employee.savedJobs.push(jobId);
        employee.save();

        // saving user id to job database 
        const job = await Job.findById(jobId);
        job.jobSavedUsers.push(userId);
        job.save();
        res.send({ success: true, message: "Job Saved" });
    } catch (error) {
        console.error(error);
        res.send({ success: false, message: "Error in saving job" });
    }
};

// Unsaving a Job from employee database
export const unsaveJobController = async (req, res) => {
    const { jobId } = req.params;

    // from the middleware
    const userId = req.user._id;
    try {

        // Removing job id from user database 
        const employee = await Employee.findById({ _id: userId });
        const jobIndex = employee.savedJobs.indexOf(jobId);
        if (jobIndex !== -1) {
            employee.savedJobs.splice(jobIndex, 1);
            employee.save();
        }

        // Removing user id from job database 
        const job = await Job.findById(jobId);
        const userIndex = job.jobSavedUsers.indexOf(userId);
        if (userIndex !== -1) {
            job.jobSavedUsers.splice(userIndex, 1);
            job.save();
        }

        res.send({ success: true, message: "Job Removed From Saved" });
    } catch (error) {
        console.error(error);
        res.send({ success: false, message: "Error in unsaving job" });
    }
};

// get all saved jobs
export const getAllSavedJobs = async (req, res) => {
    // from middleware
    const userId = req.user._id
    try {
        const employee = await Employee.findById({ _id: userId });
        const savedJobs = await employee.populate("savedJobs")
        res.send({ savedJobs, message: "Fetcehd all jobs successfully" });
    } catch (error) {
        console.error(error);
        res.send({ success: false, message: "Error in saving job" });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        res.send({ employees, success: true, message: "fetched employees succesfully" });
    } catch (error) {
        console.error(error);
        res.send({ success: false, message: "Error in fetching employees" });
    }
}
