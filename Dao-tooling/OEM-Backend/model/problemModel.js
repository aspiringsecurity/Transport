const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please enter the problem title"],
    },
    description: {
      type: String,
      required: [true, "Please enter the description"],
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// problemSchema.index({ title: "text" });

module.exports = mongoose.model("Problem", problemSchema);
