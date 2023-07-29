import express from "express"
import { createJobController, deleteJobController, jobUpdateController, singleJobPageController, totalJobApplicantsController } from "../controllers/companyControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import slugify from "slugify";

const router = express.Router()

// Creating a job post
router.post("/create-job", requireSignIn, createJobController);

// Update the job 
router.put("/update-job/:jobId", requireSignIn, jobUpdateController);

// delete a job post
router.delete("/delete-job/:jobId", requireSignIn, deleteJobController);

// total applicants for the job
router.get("/populate-applicants/:jobId", requireSignIn, totalJobApplicantsController);

// single job page
router.get("/single-page-job/:jobId", requireSignIn, singleJobPageController);


// testing slug
router.post("/nothing", (req, res) => {
    const { msg } = req.body
    try {
        const slug = slugify(msg)
        res.send({ message: slug })
    } catch (error) {
        console.log(error)
    }
});


export default router;