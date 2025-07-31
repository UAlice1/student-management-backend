// routes/studentRoutes.js
import express from 'express';
const router = express.Router();

import {
  getStudents,     // Read all students
  getStudentById,  // Read one student by ID
  addStudent,      // Create a new student
  updateStudent,   // Update student by ID
  deleteStudent    // Delete student by ID
} from '../controllers/StudentController.js';

// CREATE
router.post('/post', addStudent);

// READ
router.get('/get', getStudents);        
router.get('/get/:id', getStudentById);   

// UPDATE
router.put('/put/:id', updateStudent);

// DELETE
router.delete('/delete/:id', deleteStudent);

export default router;
