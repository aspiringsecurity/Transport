const express = require("express");
const {
  addComment,
  getAllComments,
  removeComment,
} = require("../controller/commentController");

const { verifyToken } = require("../controller/authController");

const router = express.Router({ mergeParams: true });

router.route("/").post(verifyToken, addComment).get(getAllComments);

router.route("/:commentId").delete(verifyToken, removeComment);

module.exports = router;
