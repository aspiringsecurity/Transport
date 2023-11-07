const Comment = require("../model/solutionComments");
const AppError = require("../utils/myAppError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/APIFeatures");

exports.addComment = catchAsync(async (req, res, next) => {
  const { type, title, comment } = req.body;
  const { solutionId } = req.params;

  const commentCreated = await Comment.create({
    type,
    title,
    comment,
    user: req.user._id,
    solution: solutionId,
  });

  await commentCreated.populate("user");

  res.status(201).json({
    status: "success",
    data: {
      commentCreated,
    },
  });
});

exports.getAllComments = catchAsync(async (req, res, next) => {
  const { solutionId } = req.params;

  const features = new ApiFeatures(
    Comment.find({ solution: solutionId }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const comments = await features.query;

  return res.status(200).json({
    status: "success",
    results: comments.length,
    data: {
      comments,
    },
  });
});

exports.removeComment = catchAsync(async (req, res, next) => {
  const { commentId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  // Check if the current user is authorized to delete the comment
  if (comment.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError("You are not authorized to delete this comment", 403)
    );
  }

  await Comment.findByIdAndDelete(commentId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
