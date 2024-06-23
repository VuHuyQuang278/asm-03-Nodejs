const express = require("express");

const isAuth = require("../middleware/is-auth");
const messageController = require("../controllers/message");

const router = express.Router();

router.get("/", isAuth, messageController.getAllConversation);

router.get("/getmess", isAuth, messageController.getMessages);

router.get("/admin/:receiverId", isAuth, messageController.adminGetMessages);

router.post("/send/:id", isAuth, messageController.sendMessage);

router.post(
  "/send/admin/:receiverId",
  isAuth,
  messageController.adminSendMessage
);

module.exports = router;
