const express= require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require("cors")



require('dotenv').config({path:'./.env'})

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    
    origin:"https://dispensary-managementfrontend.vercel.app",
    credentials:true
}));


require('./connection'); // Assuming connection.js is in the same directory

const userRoutes = require('./Routes/user');
const facilityRoutes=require('./Routes/facility');
const medicineRoutes=require('./Routes/medicine');
const hopitalRoutes=require('./Routes/nearByHospital');
const notificationRoutes= require('./Routes/notification')
const gallaryRoutes = require("./Routes/gallary");
const historyRoutes = require("./Routes/history");


app.use('/api/auth', userRoutes);
app.use('/api/facility',facilityRoutes);
app.use('/api/medicine',medicineRoutes);
app.use('/api/hospital',hopitalRoutes);
app.use('/api/notification',notificationRoutes)
app.use('/api/gallary',gallaryRoutes);
app.use('/api/history',historyRoutes);


app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});


app.listen(process.env.PORT, () => {
    console.log('Server is running on port',process.env.PORT);
});
