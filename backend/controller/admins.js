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
            let admin = await Admins.findById(req.user._id);
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
}

export default new AdminsController();
