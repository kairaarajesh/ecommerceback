import {Admin} from "../models/admin.js";
import bcrypt from "bcrypt";


export const createAdmin = async (req, res) => {
    try{
    const { name, email, password,role, permissions } = req.body;

     const existingAdmin = await Admin.findOne({ email });
     if (existingAdmin) { return res.status(400).json({ message: "Email already exists" }); } 

   const hashPassword = await bcrypt.hash(password, 10);
  
   const admin = new Admin({
    name,
    email,
    password: hashPassword,
    role,
    status: "active",
    permissions: permissions || {}
   });
  
   const adminData = await admin.save();

   // Remove password from response
   const adminResponse = adminData.toObject();
   delete adminResponse.password;
  
  //  const token = admin.getJwtToken();
   
   return res.status(201).json({
    message: "Admin Create successfully",
    data: adminResponse,
    // token
   });
  } 
  catch (error) {
    console.log("===",error);
    res.status(500).json({ message: "Server Error" });
   }
}

export const getAllAdmin = async (req, res) => {
  try {
       const admin = await Admin.find().select('-password');
       res.status(200).json({
        message: "Admin get successfully",
        data: admin
       });
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
       }
  }

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, status , permissions } = req.body;
  
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    } 
  
    // if (email) {
    //   const existingAdmin = await Admin.findOne({ email });
    //   if (existingAdmin) {
    //     return res.status(400).json({ message: "Email already exists" });
    //   }

    const hashPassword = password ? await bcrypt.hash(password, 10) : undefined;
  
    const updatedData = {
      name,
      email,
      role,
      status,
    }
    if (hashPassword) {
      updatedData.password = hashPassword;
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(id, { new: true }).select('-password');

    if (!updatedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

  res.status(200).json({
    message: "Admin updated successfully",
    data: updatedAdmin
  });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({
      message: "Admin deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}


export const loginAdmin = async (req, res) => {
   try {
        const { email, password } = req.body; 

        const admin =await Admin.findOne({ email });
        if(!admin) {
          return res.status(400).json({ message: "Admin or password invalid" });

        }

        const MatchPassword = await bcrypt.compare(password, admin.password)
        if(!MatchPassword){
          return res.status(404).json({Message : "Admin or Password invalid"})
        }

        const token = admin.getJwtToken();

      // Remove password from response
        const adminResponse = admin.toObject();
        delete adminResponse.password;

        // const options = {
        //   expires: new Date(Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000), // 3 days
        //   httpOnly: true,
        // };

        return res.status(200).cookie("token", token,{
          expires: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000   //  3 days
          ),
          httpOnly: true,
           secure: process.env.NODE_ENV === "production",
          sameSite: "strict",

        }).json({
            message: "Login successful",
            data: adminResponse,
            token
        });
   }
   catch (error) { 
    res.status(500).json({ message: "Server Error" });
   }  
   
}