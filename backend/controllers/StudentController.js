// controllers/StudentController.js
import Student from '../models/Students.js';

// GET all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ message: 'Students fetched successfully', data: students });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch students', error: error.message });
  }
};

// GET a student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student fetched successfully', data: student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student', error: error.message });
  }
};

// POST create a new student
export const addStudent = async (req, res) => {
  try {
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student added successfully', data: student });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add student', error: error.message });
  }
};

// PUT update a student by ID
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,         
      runValidators: true 
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', data: student });
  } catch (error) {
    res.status(400).json({ message: 'Failed to update student', error: error.message });
  }
};

// DELETE a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully', data: student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete student', error: error.message });
  }
};
