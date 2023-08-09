import { Employee } from "../models/employeeModel.js"
import { Company } from "../models/companyModel.js";
import { comparePassword } from "../helpers/hashPassword.js"
import JWT from "jsonwebtoken"

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user;

        const employee = await Employee.findOne({ email });
        const company = await Company.findOne({ companyEmail: email });

        if (employee) {
            user = employee
        } else if (company) {
            user = company;
        } else {
            return res.send({ success: false, message: "User not found" });
        }
        const matchPassword = comparePassword(password, user.password);
        if (!matchPassword) {
            return res.send("Enter valid credentials");
        }
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.fullname,
                email: user.email,
                role: user.role,
                userId: user._id,
                token: token
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred in login session");
    }
}


// get all users by id
export const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        const company = await Company.findById(id);

        if (employee) {
            res.send({ employee });
        } else if (company) {
            res.send({ company });
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching user data");
    }
}
