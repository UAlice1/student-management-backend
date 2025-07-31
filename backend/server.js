import express from('express');
import dotenv from('dotenv');
import cors from('cors');
import connectDB from('./backend/config/db');

dotenv.config();

import authRoutes from('./routes/authRoutes');
import studentRoutes from('./routes/studentRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
