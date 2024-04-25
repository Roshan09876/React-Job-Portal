const Job = require("../model/jobModel");
const JobType = require("../model/jobTypeModel")
const ErrorResponse = require("../utils/errorResponse");


// //Create Job
const createJob = async (req, res, next) => {
    console.log(req.body)
    try {

        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });
        res.status(200).json({
            success: true,
            message: 'Job Created Successfully',
            job
        })
    } catch (error) {
        return next(error);
    }
}


//Update Job
const updateJob = async (req, res, next) => {
    console.log(req.body)
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
        .populate('jobType', 'jobTypeName')
        res.status(200).json({
            success: true,
            message: 'Job edit success',
            job
        })
    } catch (error) {
        return next(error)
    }
}


//For Single Job 
const singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id)
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return next(error);
    }
}

const showallJobs = async (req, res, next) => {
    try{
        const showJob = await Job.find()
        res.status(200).json({
            success: true,
            message: 'All jobs Fetched Successfully', 
            showJob
        })
    } catch(err){
        return next(err)
    }
}

//Search Filter
const showJobs = async (req, res, next) => {

    let query = req.query.keyword ? {
        title: {
            $regex: new RegExp(req.query.keyword, 'i')
        }
    } : {};

    // filter jobs by category ids
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })
    if(req.query.cat){
        query = {...query, jobType :  req.query.cat};
    }


    //jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    if(location){
        let locationFilter = location !== '' ? location : setUniqueLocation;
        query = {...query, location :  locationFilter};
    }


    //enable pagination
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    console.log(query)
    const count = await Job.find({ ...query }).countDocuments();

    try {
        // const jobs = await Job.find({ ...keyword, jobType: categ, location: locationFilter }).sort({ createdAt: -1 }).skip(pageSize * (page - 1)).limit(pageSize)
        const jobs = await Job.find({ ...query }).sort({ createdAt: -1 }).skip(pageSize * (page - 1)).limit(pageSize)
        
        res.status(200).json({
            success: true,
            message: 'Search Success',
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation,
           
        })
    } catch (error) {
        next(error);
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const user = await Job.findByIdAndDelete(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: 'Job Deleted Successfully',
            user,
            
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    createJob, singleJob, updateJob, showJobs, showallJobs, deleteJob
}