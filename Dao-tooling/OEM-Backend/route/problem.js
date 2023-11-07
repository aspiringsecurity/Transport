const express = require("express");
const router = express.Router();

const {
  addProblem,
  getSingleProblem,
  getAllProblems,
  deleteProblem,
} = require("../controller/problemController");

const { verifyToken } = require("../controller/authController");
const {
  createUpvote,
  removeUpvote,
  getAllUpvotes,
  getUpvote,
} = require("../controller/problemUpvoteController");

router
  .post("/:problemId/create-upvote", verifyToken, createUpvote)
  .get("/:problemId/upvotes", getAllUpvotes);
router
  .get("/upvotes/upvoteId", getUpvote)
  .delete("/:problemId/remove-upvote", verifyToken, removeUpvote);

router.route("/").post(verifyToken, addProblem).get(getAllProblems);

router.route("/:id").get(getSingleProblem).delete(verifyToken, deleteProblem);

module.exports = router;
