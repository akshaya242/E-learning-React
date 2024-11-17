const bcrypt = require('bcrypt');
const { User, Profile } = require('../models/User');
const { Course } = require('../models/Course');
const { Enrollment } = require('../models/Enrollment');
const Billing = require('../models/Billing');
const FAQ = require('../models/FAQ');

// Home Page Data
exports.home = async (req, res) => {
    try {
        const faqs = await FAQ.find().limit(3).lean();
        const courses = await Course.find().limit(3).lean();

        const coursesWithInstructors = await Promise.all(
            courses.map(async (course) => {
                const instructor = await User.findById(course.instructorId).lean();
                return {
                    ...course,
                    instructorName: instructor ? instructor.name : 'Unknown',
                    instructorEmail: instructor ? instructor.email : 'N/A'
                };
            })
        );

        const teachers = await User.find({ role: 'teacher' }).limit(5).lean();
        const teacherData = await Promise.all(
            teachers.map(async (teacher) => {
                const profile = await Profile.findOne({ userId: teacher._id });
                return {
                    name: teacher.name,
                    email: teacher.email,
                    imgSrc: profile?.profilePic,
                    bio: profile?.bio
                };
            })
        );

        const userId = req.session.user ? req.session.user.id : null;
        const user = userId ? await User.findById(userId).lean() : null;

        res.json({ faqs, teachers: teacherData, courses: coursesWithInstructors, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// FAQs
exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().lean();
        res.status(200).json(faqs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find().lean();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Filtered Courses
exports.getFilteredCourses = async (req, res) => {
    const { search, category } = req.query;
    let query = {};

    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
        query.category = Array.isArray(category) ? { $in: category } : category;
    }

    try {
        const courses = await Course.find(query).lean();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Authentication
exports.handleSignup = async (req, res) => {
    const { email, password, name, role, institution } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name, role, institution });
        await newUser.save();

        const newProfile = new Profile({ user_id: newUser._id });
        await newProfile.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed' });
    }
};

exports.handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        req.session.user = { id: user._id, name: user.name, role: user.role, email: user.email };
        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Dashboard
exports.showDashboard = async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json({ message: 'Dashboard data', user });
};

// Enrollment
exports.enrollInCourse = async (req, res) => {
    const userId = req.session.user.id;
    const courseId = req.params.courseId;

    try {
        const existingEnrollment = await Enrollment.findOne({ courseId, user_id: userId });
        if (existingEnrollment) {
            return res.status(400).json({ error: 'Already enrolled' });
        }

        const enrollment = new Enrollment({
            courseId,
            user_id: userId,
            enrollment_date: new Date(),
            progress: 0,
            completionStatus: 'in-progress'
        });

        await enrollment.save();
        await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: userId } });
        res.json({ message: 'Enrollment successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Enrollment failed' });
    }
};

// Profile
exports.updateProfile = async (req, res) => {
    const userId = req.session.user.id;
    const { bio, contact_number, address } = req.body;

    try {
        await Profile.updateOne({ user_id: userId }, { bio, contact_number, address });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Profile update failed' });
    }
};
