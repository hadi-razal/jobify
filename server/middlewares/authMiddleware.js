import JWT from "jsonwebtoken";

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

export const companyUser = async (req, res, next) => {
    try {
        const role = req.headers.role;
        if (role === "company") {
            next(); // Proceed to the next middleware or route handler
        } else {
            res.status(401).send({
                status: false,
                message: "Sorry, we can't verify you"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "Internal server error"
        });
    }
};