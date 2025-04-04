const express = require("express");
const passport = require("passport");
const createCalenderEvent = require("../utils /googleCalender");
require("../middleware/passport.config");
const googleController = express();

googleController.use(passport.initialize());

googleController.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
  })
);

googleController.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    try {
    //   const { accessToken } = req.user.user;
    //   const event = {
    //     summary: "Welcome Call",
    //     description: "Onboarding session",
    //     start: new Date("2025-04-05T10:00:00").toISOString(),
    //     end: new Date("2025-04-05T11:00:00").toISOString(),
    //   };
    //   const calendarEvent = await createCalenderEvent(accessToken, event);
      res.json({
        token: req.user.token,
        user: req.user.user,
        // calendarEvent,
      });
    } catch (error) {
      res.status(500).send({ status: 500, message: error.message });
    }
  }
);

module.exports = googleController;
