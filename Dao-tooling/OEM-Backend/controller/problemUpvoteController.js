const ProblemUpvote = require("../model/problemUpvote");
const AppError = require("../utils/myAppError");
const catchAsync = require("../utils/catchAsync");

exports.createUpvote = catchAsync(async (req, res, next) => {
  const { problemId } = req.params;
  const upvote = await ProblemUpvote.create({
    upvotedBy: req.user._id,
    problem: problemId,
  });

  res.status(201).json({
    status: "success",
    data: {
      upvote,
    },
  });
});

// To retrieve all votes
exports.getAllUpvotes = catchAsync(async (req, res, next) => {
  const { problemId } = req.params;
  const upvotes = await ProblemUpvote.find({ problem: problemId })
    .populate("problem")
    .populate("upvotedBy");
  res.status(200).json({
    status: "success",
    results: upvotes.length,
    data: {
      upvotes,
    },
  });
});

// Find a single upvote problem with id
exports.getUpvote = catchAsync(async (req, res, next) => {
  const { upvoteId } = req.params;
  const upvote = await ProblemUpvote.findById(upvoteId);

  if (!upvote) {
    return res.status(404).json({
      status: "fail",
      message: "Upvote not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      upvote,
    },
  });
});
// delete upvote
exports.removeUpvote = catchAsync(async (req, res, next) => {
  const { problemId } = req.params;

  const upvote = await ProblemUpvote.findOneAndDelete({
    $and: [{ problem: problemId }, { upvotedBy: req.user._id }],
  });

  if (!upvote) {
    return next(new AppError(`No upvote with id: ${problemId} created by you`));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
