const mongoose = require('mongoose')
const studentSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Enter your First Name"]
        },
        lastName: {
            type: String,
            required: [true, "Enter your Last Name"]
        },
        course: {
            type: String,
            required: [true, "Course is required"]
        },
        year: {
            type: Number,
            required: [true, "Year is required"],
            min: 1,
            max: [5, "Year must be at most 5"]
        },
        enrolled: {
            type: Boolean,
            required: [true, "Enrollment status is required"],
            default: true
        }
    },
    {
        timestamps: true 
    }
)


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;