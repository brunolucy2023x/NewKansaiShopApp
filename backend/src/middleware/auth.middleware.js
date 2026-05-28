import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

/* =========================================================
   PROTECT ROUTE
========================================================= */
export const protectRoute = [
  requireAuth(),

  async (req, res, next) => {
    try {
      // Clerk user id
      const clerkId = req.auth?.userId;

      if (!clerkId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - invalid token",
        });
      }

      // Find user in DB
      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Attach user to request
      req.user = user;

      next();
    } catch (error) {
      console.error(
        "ERROR IN protectRoute MIDDLEWARE:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
];

/* =========================================================
   ADMIN ONLY
========================================================= */
export const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - user not found",
      });
    }

    // safer email comparison
    const userEmail = req.user.email?.toLowerCase()?.trim();

    const adminEmail = ENV.ADMIN_EMAIL?.toLowerCase()?.trim();

    if (userEmail !== adminEmail) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - admin access only",
      });
    }

    next();
  } catch (error) {
    console.error(
      "ERROR IN adminOnly MIDDLEWARE:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};