const express=require("express");
const router=express.Router();
const UserController=require("../Controllers/user");
const Authentication=require("../Authentication/auth")

router.post("/register",UserController.register);
router.post("/login",UserController.login);

router.put("/update-student/:id",Authentication.adminFacultyAuth,UserController.updateStudentById);
router.get("/get-student-by-roll/:roll",Authentication.adminFacultyAuth,UserController.getStudentByRollNo);
router.post("/registerStudentByStaff",Authentication.adminFacultyAuth,UserController.registerStudentByStaff);
router.post("/add-staff",Authentication.adminFacultyAuth,UserController.addStaffsByAdmin);


router.post("/send-otp",UserController.sendOtp);
router.post("/verify-otp",UserController.verifyOtp);
router.post("/reset-password",UserController.resetPassword);

router.get("/get-staff",UserController.getAllStaffs);
router.put("/update-staff/:id",Authentication.adminFacultyAuth,UserController.updateStaffById);

router.delete("/delete-staff/:id",Authentication.adminFacultyAuth,UserController.deleteStaff);
router.post("/logout",Authentication.studentAuth,UserController.logout);

module.exports=router;