const Problem = require("../model/problemModel");
const AppError = require("../utils/myAppError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/APIFeatures");

const addProblem = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;

  const problem = await Problem.create({
    title,
    description,
    createdBy: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: {
      problem,
    },
  });
});

const getSingleProblem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide a problem id", 400));
  }

  const problem = await Problem.findOne({ _id: id });

  if (!problem) {
    return next(new AppError(`No problem with id: ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      problem,
    },
  });
});

const getAllProblems = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Problem.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const problems = await features.query;

  return res.status(200).json({
    status: "success",
    results: problems.length,
    data: {
      problems,
    },
  });
});

const deleteProblem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide a problem id", 400));
  }

  const problem = await Problem.findOneAndDelete({
    $and: [{ _id: id }, { createdBy: req.user._id }],
  });

  if (!problem) {
    return next(new AppError(`No problem with id: ${id} created by you`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  addProblem,
  getSingleProblem,
  getAllProblems,
  deleteProblem,
};
