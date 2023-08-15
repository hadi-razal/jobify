import express from "express"
import { applyForJobController, getAllJobController, createJobController, deleteJobController, getJobCategoryBasedController, jobSearchController, jobUpdateController, singleJobPageController, totalJobApplicantsController, getCompanyJobsController } from "../controllers/jobController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
// import slugify from "slugify";

const router = express.Router()

// Creating a job post
router.post("/create-job", requireSignIn, createJobController);

// Update the job 
router.put("/update-job/:jobId", requireSignIn, jobUpdateController);

// delete a job post
router.delete("/delete-job/:jobId", requireSignIn, deleteJobController);

// get all job posts
router.get("/get-jobs", requireSignIn, getAllJobController);

// total applicants for the job
router.get("/populate-applicants/:jobId", requireSignIn, totalJobApplicantsController);

//Apply for the job
router.put("/apply-for-job/:jobId", requireSignIn, applyForJobController);

// single job page
router.get("/single-page-job/:jobId", requireSignIn, singleJobPageController);

// jobs based on category (pass the category as slug from the client)
router.get("/get-category/:category", requireSignIn, getJobCategoryBasedController)

//job serach
router.get("/search-job", requireSignIn, jobSearchController)

// get all jobs from a single company
router.get("/get-jobs-mycompany", requireSignIn, getCompanyJobsController)


//middlewaretest
// router.get("/test-job", companyUser, (req, res) => {
//     res.send("Hello How are you")
// })

// testing slugify
// router.post("/nothing", (req, res) => {
//     const { msg } = req.body
//     try {
//         const slug = slugify(msg)
//         res.send({ message: slug })
//     } catch (error) {
//         console.log(error)
//     }
// });


export default router;