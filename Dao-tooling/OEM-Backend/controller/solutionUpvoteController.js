const SolutionUpvote = require("../model/solutionUpvote");
const AppError = require("../utils/myAppError");
const catchAsync = require("../utils/catchAsync");

// To create all upvotes
exports.createUpvote = catchAsync(async (req, res, next) => {
  const { solutionId } = req.params;
  const upvote = await SolutionUpvote.create({
    upvotedBy: req.user._id,
    solution: solutionId,
  });

  res.status(201).json({
    status: "success",
    data: {
      upvote,
    },
  });
});

//retrieve all upvotes
exports.getAllUpvotes = catchAsync(async (req, res, next) => {
  const { solutionId } = req.params;
  const upvotes = await SolutionUpvote.find({ solution: solutionId })
    .populate("solution")
    .populate("upvotedBy");

  res.status(200).json({
    status: "success",
    results: upvotes.length,
    data: {
      upvotes,
    },
  });
});

// Find a single upvote solution with id
exports.getUpvote = catchAsync(async (req, res, next) => {
  const { upvoteId } = req.params;
  const upvote = await SolutionUpvote.findById(upvoteId);

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
// delete solution upvotes
exports.removeUpvote = catchAsync(async (req, res, next) => {
  const { solutionId } = req.params;

  const upvote = await SolutionUpvote.findOneAndDelete({
    $and: [{ solution: solutionId, upvotedBy: req.user._id }],
  });

  if (!upvote) {
    return next(
      new AppError(`No upvote with id: ${solutionId} created by you`)
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
