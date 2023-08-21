import { hashPassword } from "../helpers/hashPassword.js";
import { Company } from "../models/companyModel.js";
import { Employee } from "../models/employeeModel.js";


// Creating an account for jobify  as a company
export const registerCompanyController = async (req, res) => {
    try {
        const { name, email, password, companyEstablishedYear } = req.body;
        const isCompanyEmailExist = await Company.findOne({ email });
        const isEmployeeEmailExist = await Employee.findOne({ email });

        const lowerCaseEmail = email.toLowerCase()

        if (isCompanyEmailExist) {
            return res.send({ success: false, message: "Email already in use" });
        }
        if (isEmployeeEmailExist) {
            return res.send({ success: false, message: "Email is already in use as a employee account " });
        }
        const hashedPassword = await hashPassword(password)
        const newCompany = await new Company({
            name, email: lowerCaseEmail, password: hashedPassword, companyEstablishedYear
        }).save();

        res.status(200).send({ newCompany, success: true, message: "Company Account created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error Registering a company account" });
    }
}


// update company profile
export const updateCompanyProfileController = async (req, res) => {
    try {
        const companyId = req.user._id;
        const { name, description, companyEstablishedYear } = req.body;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).send({ success: false, message: "Company not found" });
        }

        company.name = name;
        company.description = description;
        company.companyEstablishedYear = companyEstablishedYear;

        const updatedCompany = await company.save();

        res.send({ success: true, message: "Company Profile Updated successfully", updatedCompany });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error updating company profile" });
    }
};


// get company controllerer
export const getCompanyController = async (req, res) => {
    try {
        const companyId = req.user._id
        const company = await Company.findById({ _id: companyId })
        res.send({ company, success: true, message: "fetched company details" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching company details" });
    }
}

// get company by id controllerer
export const getCompanyByIdController = async (req, res) => {
    try {
        const { companyId } = req.params
        const company = await Company.findById({ _id: companyId })
        res.send({ company, success: true, message: "fetched company details" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching company details" });
    }
}


//save a JobSeeker profile to a company
export const saveProfileController = async (req, res) => {
    try {
        const companyId = req.user._id
        const { profileId } = req.params
        const company = await Company.findById(companyId)
        if (company.savedProfile.includes(profileId)) {
            return res.send({ company, success: false, message: "Profile Already Saved" })
        }
        company.savedProfile.push(profileId)
        company.save()
        res.send({ company, success: true, message: "Profile Saved" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in saving profile" });
    }
}


export const unsaveProfileController = async (req, res) => {
    try {
        const { profileId } = req.params;
        const companyId = req.user._id;
        const company = await Company.findById(companyId);

        const indexToRemove = company.savedProfile.indexOf(profileId);

        if (indexToRemove !== -1) {
            company.savedProfile.splice(indexToRemove, 1);
            await company.save();
            res.send({ success: true, message: "Profile Unsaved" });
        } else {
            res.send({ success: false, message: "Profile not found in saved profiles" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in unsaving profile" });
    }
};

// get saved profiles 
export const getSavedProfilesController = async (req, res) => {
    try {
        const companyId = req.user._id;
        const employees = await Company.findById(companyId).populate({
            path: "savedProfile",
            select: "-appliedJobs -savedJobs" // Exclude the 'name' field from savedProfile
        });
        res.send({ employees, success: true, message: "Profiles fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error in fetching saved profiles" });
    }
};
