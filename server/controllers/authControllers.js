import { comparePassword, hashPassword } from "../helpers/hashPassword.js";
import { User } from "../models/userModel.js";
import JWT from "jsonwebtoken";



// Creating an account for jobify 
export const registerController = async (req, res) => {
    try {
        const { fullname, email, password, workExperience, education, role } = req.body;
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.send({ message: "Email already in use" });
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await new User({
            fullname,
            email,
            password: hashedPassword,
            workExperience,
            education,
            role
        }).save();

        res.send({ newUser, message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error registering user" });
    }
};


// Login Controller 
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({ message: "Enter valid credentials" });
        }
        const match = comparePassword(password, user.password)
        if (!match) {
            return res.send({ message: "Enter valid credentials" });
        }
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.fullname,
                email: user.email,
                role: user.role,
            },
            token
        })
    } catch (error) {
        console.log(error)
        res.send({ message: "Unable to login" })
    }
}
