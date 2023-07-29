import JWT from "jsonwebtoken";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode;
        console.log(req.user)
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({
            status: false,
            message: "Sorry,We Can't verify You"
        })
    }
};