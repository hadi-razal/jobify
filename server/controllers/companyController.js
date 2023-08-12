import { hashPassword } from "../helpers/hashPassword.js";
import { Company } from "../models/companyModel.js";
import { Employee } from "../models/employeeModel.js";


// Creating an account for jobify  as a company
export const registerCompanyController = async (req, res) => {
    try {
        const { companyName, email, password, companyEstablishedYear } = req.body;
        const isCompanyEmailExist = await Company.findOne({ email });
        const isEmployeeEmailExist = await Employee.findOne({ email });


        if (isCompanyEmailExist) {
            return res.send({ success: false, message: "Email already in use" });
        }
        if (isEmployeeEmailExist) {
            return res.send({ success: false, message: "Email is already in use as a employee account " });
        }
        const hashedPassword = await hashPassword(password)
        const newCompany = await new Company({
            companyName, email, password: hashedPassword, companyEstablishedYear
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
        const { companyName, bannerImg, profileImage, companyEstablishedYear } = req.body;
        const isCompanyEmailExist = await Company.find({ email });

        if (isCompanyEmailExist) {
            return res.send({ success: false, message: "Email already in use" });
        }
        const updateCompanyProfile = await Company({
            companyName, bannerImg, profileImage, companyEmail, companyEstablishedYear
        }, { new: true })

        res.send({ updateCompanyProfile, success: true, message: "Company Profile Updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error Updating company profile account" });
    }
}


// get company controllerer
export const getCompanyController = async (req, res) => {
    try {
        const companyId = req.user._id
        const company = await Company.findById(companyId)
        res.send({ company, success: true, message: "fetched company details" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error fetching company details" });
    }
}


//save a JobSeeker profile to a company
export const saveJobSeekerProfileController = async () => {
    try {

    } catch (error) {

    }
}