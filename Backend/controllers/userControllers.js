const User = require("../model/userModel");
const ErrorResponse = require("../utils/errorResponse");

// Function to load all the users
const allUsers = async (req, res, next) => {
    // Enabling Pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();

    try {
        const users = await User.find()
            .sort({ createdAt: -1 })       // Sorts users by the creation date in descending order
            .select('-password')           // Excludes the 'password' field from the results
            .skip(pageSize * (page - 1))   // Skips the appropriate number of documents based on the requested page
            .limit(pageSize);              // Limits the number of documents returned per page

        res.status(200).json({
            success: true,
            users,
            pages: Math.ceil(count / pageSize),
            count
        });

        // Move next() inside the try block to ensure it's called only on success
        next();
    } catch (error) {
        return next(error);
    }
};

//Show Single User By id
const singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next()
    } catch (error) {
        return next(error);
    }
}

//Edit/Update User by grabbing ID
const editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'User Edit Successfully',
            user
        })
        next()
    } catch (error) {
        return next(error)
    }
}

//Delete User 
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: 'User Deleted',
            user,
            
        })
    } catch (error) {
        return next(error)
    }
}
const createUserJobsHistory = async (req, res, next) => {
    const { title, description, salary, location } = req.body;

    try {
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse("You must log In", 401));
        } else {
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                user: req.user._id
            }
            currentUser.jobsHistory.push(addJobHistory);
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            currentUser
        })
        next();

    } catch (error) {
        return next(error);
    }
}

const getUserJobHistory = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, jobHistory: user.jobsHistory });
    } catch (error) {
        return next(error);
    }
};
// const userId = 'your_user_id_here';
// fetch(`http://localhost:5500/api/user/jobhistory/65db0115c3326b4a4560d28e`, {
//   method: 'GET',
//   headers: {
//     'Authorization': 'Bearer your_token_here', // If authentication is required
//     'Content-Type': 'application/json'
//   }
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));


module.exports = {
    allUsers, singleUser, editUser, deleteUser, createUserJobsHistory, getUserJobHistory
};
