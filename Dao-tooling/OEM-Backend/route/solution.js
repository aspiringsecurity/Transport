const express = require("express");
const router = express.Router();
const commentRoutes = require("./comment");

const {
  addSolution,
  getSingleSolution,
  getAllSolutions,
  deleteSolution,
} = require("../controller/solutionController");

const { verifyToken } = require("../controller/authController");
const {
  createUpvote,
  removeUpvote,
  getAllUpvotes,
  getUpvote,
} = require("../controller/solutionUpvoteController");

router.use("/:solutionId/comments", commentRoutes);

router
  .post("/:solutionId/create-upvote", verifyToken, createUpvote)
  .get("/:solutionId/upvotes", getAllUpvotes);
router
  .get("/upvotes/upvoteId", getUpvote)
  .delete("/:solutionId/remove-upvote", verifyToken, removeUpvote);

router.route("/").get(getAllSolutions).post(verifyToken, addSolution);

router.route("/:id").get(getSingleSolution).delete(verifyToken, deleteSolution);

module.exports = router;
