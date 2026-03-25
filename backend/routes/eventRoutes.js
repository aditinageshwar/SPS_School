const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const eventController = require("../controllers/eventController");

// 🔥 OPERATIONS_ADMIN → create/update/delete
router.post(
  "/create",
  auth,
  role("OPERATIONS_ADMIN", "SUPER_ADMIN"),
  eventController.createEvent
);

router.put(
  "/:id",
  auth,
  role("OPERATIONS_ADMIN", "SUPER_ADMIN"),
  eventController.updateEvent
);

router.delete(
  "/:id",
  auth,
  role("OPERATIONS_ADMIN", "SUPER_ADMIN"),
  eventController.deleteEvent
);

// 🔥 Everyone → view events
router.get(
  "/all",
  auth,
  eventController.getEvents
);

module.exports = router;