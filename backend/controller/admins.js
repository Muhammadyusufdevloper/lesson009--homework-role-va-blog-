import { Admins, adminsValidation } from "../models/adminsSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function requiredCatch() {
    return {
        msg: "Server error",
        variant: "error",
        payload: null
    };
}

function informationReturn(msg, variant, payload) {
    return {
        msg,
        variant,
        payload
    };
}

class AdminsController {
    async getProfile(req, res) {
        try {
            const id = req.user._id;
            const admin = await Admins.findById(id);

            if (!admin) {
                return res.status(404).json(informationReturn("Admin profile not found", "error", null));
            }
            res.status(200).json(informationReturn("Admin profile fetched successfully", "success", admin));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async registerAdmin(req, res) {
        try {
            const { error } = adminsValidation(req.body);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "error", null));
            }
            const existAdmin = await Admins.exists({ username: req.body.username });

            if (existAdmin) {
                return res.status(400).json(informationReturn("Admin already exists", "warning", null));
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const admin = await Admins.create(req.body);
            res.status(201).json(informationReturn("Admin created", "success", admin));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async loginAdmin(req, res) {
        try {
            const { username, password } = req.body;
            const user = await Admins.findOne({ username });
            if (!user) {
                return res.status(400).json(informationReturn("Username or password incorrect", "error", null));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                return res.status(200).json({
                    ...informationReturn("Admin signed in", "success", user),
                    token
                });
            } else {
                return res.status(400).json(informationReturn("Username or password incorrect", "error", null));
            }
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async updateProfile(req, res) {
        try {
            const id = req.user._id;
            const { username } = req.body;

            const user = await Admins.findById(id);
            if (!user) {
                return res.status(400).json(informationReturn("User not found", "error", null));
            }

            const checkUsername = await Admins.findOne({ username });
            if (checkUsername && checkUsername._id.toString() !== id) {
                return res.status(400).json(informationReturn("Username already exists", "warning", null));
            }

            const updatedUser = await Admins.findByIdAndUpdate(
                id,
                { ...req.body, password: user.password },
                { new: true }
            );

            res.status(200).json(informationReturn("Profile updated successfully", "success", updatedUser));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async resetPassword(req, res) {
        try {
            const id = req.user._id;
            const user = await Admins.findById(id);
            if (!user) {
                return res.status(400).json(informationReturn("User not found", "error", null));
            }

            const { password, newPassword } = req.body;
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const hashPassword = await bcrypt.hash(newPassword, 10);
                const updatedUser = await Admins.findByIdAndUpdate(
                    id,
                    { password: hashPassword },
                    { new: true }
                );

                res.status(200).json(informationReturn("Password updated successfully", "success", updatedUser));
            } else {
                res.status(400).json(informationReturn("Invalid password", "error", null));
            }
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }
}

export default new AdminsController();
