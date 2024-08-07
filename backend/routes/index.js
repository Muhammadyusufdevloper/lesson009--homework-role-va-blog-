import express from "express";
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js";
import OwnersController from "../controller/owner.js";
import AdminsController from "../controller/admins.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//----------------- Blogs routes -----------------\\
router.get("/api/blogs", [auth], BlogsController.get);
router.get("/api/blogs/:id", [auth], BlogsController.getById);
router.post("/api/blogs", [auth], BlogsController.post);
router.put("/api/blogs/:id", [auth], BlogsController.put);
router.delete("/api/blogs/:id", [auth], BlogsController.delete);

//----------------- Users routes -----------------\\
router.get('/api/profile', [auth], UsersController.getProfile);
router.post('/api/users/sign-up', UsersController.registerUser);
router.post('/api/users/sign-in', UsersController.loginUser);

//----------------- Admins routes -----------------\\
router.get("/api/admin", AdminsController.getProfile);
router.post("/api/admin/register", AdminsController.registerAdmin);
router.post("/api/admin/login", AdminsController.loginAdmin);

//----------------- Owners routes -----------------\\
router.get("/api/owner", OwnersController.getProfile);
router.post("/api/owner/register", OwnersController.registerOwner);
router.post("/api/owner/login", OwnersController.loginOwner);

export default router;
