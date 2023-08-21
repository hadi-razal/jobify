import express from "express"
import { getJobsStatusController, getSingleCompanyJobsController, getAllJobController, createJobController, deleteJobController, getJobCategoryBasedController, jobSearchController, jobUpdateController, singleJobPageController, totalJobApplicantsController, getCompanyJobsController, applyForJobController, removeApplicationForJobController } from "../controllers/jobController.js";
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

// get all job from a single company 
router.get("/get-all-jobs/single-company/:companyId", requireSignIn, getSingleCompanyJobsController);

// total applicants for the job
router.get("/populate-applicants/:jobId", requireSignIn, totalJobApplicantsController);

//Apply for the job
router.put("/apply-for-job/:jobId", requireSignIn, applyForJobController);

//Apply for the job
router.put("/remove-job-application/:jobId", requireSignIn, removeApplicationForJobController);

// single job page
router.get("/single-job/:jobId", requireSignIn, singleJobPageController);

// jobs based on category (pass the category as slug from the client)
router.get("/get-category/:category", requireSignIn, getJobCategoryBasedController)

//job serach
router.get("/search-jobs", requireSignIn, jobSearchController)

// get all jobs from a single company
router.get("/get-jobs-mycompany", requireSignIn, getCompanyJobsController)

// get the total number or jobs posted and the combined total number of applicants 
router.get("/total-jobs/total-applicants", requireSignIn, getJobsStatusController)


//middleware test
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