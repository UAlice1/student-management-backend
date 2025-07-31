
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    Student_Id :
    {type:String,
        required:true,
        unique:true},
  Firstname:
   { type: String,
     required: true },
 Lastname: 
 { type: String,
     required: true },
 
  Email: {
    type: String,
    
  },
  Course:
   { type: String,
     required: true },
});

export default mongoose.model('Student', studentSchema);
