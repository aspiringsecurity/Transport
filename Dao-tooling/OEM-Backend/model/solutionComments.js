const mongoose = require("mongoose");

const solutionCommentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["description", "successMeasure", "totalBudget", "timeFrame"],
      required: [
        true,
        "Please enter the type of comment, this can be description, successMeasure, totalBudget or timeFrame",
      ],
    },
    title: {
      type: String,
      required: [true, "Please provide a comment title"],
    },
    comment: {
      type: String,
      required: [true, "Please enter the comment"],
    },
    solution: {
      type: mongoose.Schema.ObjectId,
      ref: "Solution",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", solutionCommentSchema);

module.exports = Comment;
