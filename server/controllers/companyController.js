import { hashPassword } from "../helpers/hashPassword.js";
import { Company } from "../models/companyModel.js";


// Creating an account for jobify  as a company
export const registerCompanyController = async (req, res) => {
    try {
        const { companyName, bannerImg, profileImage, companyEmail, password, companyEstablishedYear } = req.body;
        const isCompanyEmailExist = await Company.findOne({ companyEmail });

        if (isCompanyEmailExist) {
            return res.send({ message: "Email already in use" });
        }
        const hashedPassword = await hashPassword(password)
        const newCompany = await new Company({
            companyName, bannerImg, profileImage, companyEmail, password: hashedPassword, companyEstablishedYear
        }).save();

        res.send({ newCompany, message: "Company Account created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Registering a company account" });
    }
}


// update company profile
export const updateCompanyProfileController = async (req, res) => {
    try {
        const { companyName, bannerImg, profileImage, companyEstablishedYear } = req.body;
        const isCompanyEmailExist = await Company.findby({ companyEmail });

        if (isCompanyEmailExist) {
            return res.send({ message: "Email already in use" });
        }
        const updateCompanyProfile = await Company({
            companyName, bannerImg, profileImage, companyEmail, companyEstablishedYear
        }, { new: true })

        res.send({ updateCompanyProfile, message: "Company Profile Updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Updating company profile account" });
    }
}

//save a JobSeeker profile to a company
export const saveJobSeekerProfileController = async () => {
    try {

    } catch (error) {

    }
}