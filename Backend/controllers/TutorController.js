import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import TutorModel from "../models/TutorModel.js"
import fs from 'fs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


const addTutor = async (req, res) => {
    try {
      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
      const imageFile = req.file;
  
      // Validate required fields
      if (!imageFile) {
        return res.status(400).json({ success: false, message: "Image file is required" });
      }
  
      if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
        return res.status(400).json({ success: false, message: "Missing details" });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
  
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
      }
  
      // Check if email already exists
      const existingTutor = await TutorModel.findOne({ email });
      if (existingTutor) {
        return res.status(400).json({ success: false, message: "Email already registered" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Parse address
      let parsedAddress;
      try {
        parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
      } catch (e) {
        return res.status(400).json({ success: false, message: "Invalid address format" });
      }
  
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        folder: 'tutors',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        transformation: [{ quality: 'auto:good', fetch_format: 'auto' }],
      });
  
      // Create tutor object
      const tutorData = {
        name,
        email,
        image: imageUpload.secure_url,
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees: Number(fees),
        address: parsedAddress,
        date: Date.now(),
      };
  
      // Save to database
      const newTutor = new TutorModel(tutorData);
      await newTutor.save();
  
      // Generate JWT token
      const token = jwt.sign({ id: newTutor._id }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '1h' });
  
      // Remove the uploaded file from local storage
      if (fs.existsSync(imageFile.path)) {
        fs.unlinkSync(imageFile.path);
      }
  
      return res.status(201).json({
        success: true,
        message: "Tutor registered successfully",
        token,
        tutor: {
          name: newTutor.name,
          email: newTutor.email,
          image: newTutor.image,
          speciality: newTutor.speciality,
          degree: newTutor.degree,
          experience: newTutor.experience,
          about: newTutor.about,
          fees: newTutor.fees,
          address: newTutor.address,
        },
      });
    } catch (error) {
      console.error("Error in addTutor:", error);
  
      // Remove uploaded file on error
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
  
      return res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
    }
  };


  const loginTutor = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }
  
      // Check if tutor exists
      const tutor = await TutorModel.findOne({ email });
      if (!tutor) {
        return res.status(404).json({ success: false, message: 'Tutor not found' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, tutor.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: tutor._id }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '1h' });
  
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        tutor: {
          name: tutor.name,
          email: tutor.email,
          speciality: tutor.speciality,
          degree: tutor.degree,
          experience: tutor.experience,
          about: tutor.about,
          fees: tutor.fees,
          address: tutor.address,
          image: tutor.image,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

    const allTutors = async( req,res)=>{
        try{
           const tutors= await TutorModel.find({}).select('-password')
           res.json({success:true,tutors})

         }
           catch(error)
           {
              console.log(error)
              res.json({success:false,message:error.message})
           }
    }


    const tutorList = async (req,res)=>{

      try{
         const tut= await TutorModel.find({}).select(['-email','-password'])
         res.json({success:true,message:tut})

      }
      catch(error)
      {
          console.log(error)
          res.json({success:false,message:error.message})
      }
    }

    const getTutorById = async (req, res) => {
      try {
        const { id } = req.params;
        const tutor = await TutorModel.findById(id).select("-password");
        if (!tutor) {
          return res.status(404).json({ success: false, message: "Tutor not found" });
        }
        res.status(200).json(tutor);
      } catch (error) {
        console.error("Error fetching tutor by ID:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    };
  

    // api to get tutor appointments for tutor panel
    const appointmentsTutor= async(req,res)=>{
      try{
           const {tutId} = req.body
           const appointments = await appointmentModel.find({tutId})

           res.json({succes:true,message:appointments})
      }
      catch(error)
      {
        console.log(error);
        res.json({succes:false,message:error.message})
      }
    }


    const tutorDashboard = async(req,res)=>{
       try{
         const {tutId} = req.body
         const appointments = await appointmentModel.find({tutId})

         let earnings = 0
         appointments.map((item)=>{
          if(item.isCompleted || item.payment)
          {
             earnings+=item.amount
          }
         })

         let patients = []
         appointments.map((item)=>{
            if(!patients.includes(item.userId))
            {
              patients.push(item.userId)
            }
         })

         const dashData={
          earnings,
          appintments: appointments.length,
          patients:patients.length,
          latestAppointments:appointments.reverse().slice(0,5)
         }

         res.json({success:true,dashData})

       } 
       catch(error)
       {
          console.log(error);
          res.json({succes:false,message:error.message})
       }

    }
  
  export { addTutor , loginTutor,allTutors, tutorList,getTutorById, appointmentsTutor,tutorDashboard};
