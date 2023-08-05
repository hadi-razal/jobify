// import { Job } from "../models/jobModel.js";
import { Employee } from "../models/employeeModel.js"
// import slugify from "slugify"
import { hashPassword } from "../helpers/hashPassword.js"


// Creating an account for jobify 
export const registerEmployeeController = async (req, res) => {
    try {
        const { fullname, email, password, workExperience, education } = req.body;
        const isEmployeeExist = await Employee.findOne({ email });

        if (isEmployeeExist) {
            return res.send({ message: "Email already in use" });
        }

        const hashedPassword = await hashPassword(password)
        const newEmployee = await new Employee({
            fullname,
            email,
            password: hashedPassword,
            workExperience,
            education,
        }).save();

        res.send({ newEmployee, message: "Employee Account created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error registering Employee" });
    }
};


// Saving a Job to employee database
export const saveJobController = async (req, res) => {
    const { jobId } = req.params;

    // from the middleware
    const userId = req.user._id
    try {
        const employee = await Employee.findById({ _id: userId });
        employee.savedJobs.push(jobId);
        employee.save();
        res.send({ message: "Job Saved" });
    } catch (error) {
        console.error(error);
        res.send({ message: "Error in saving job" });
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
        res.send({ message: "Error in saving job" });
    }
};

