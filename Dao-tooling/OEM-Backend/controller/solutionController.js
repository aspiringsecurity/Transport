const Solution = require("../model/solutionModel");
const AppError = require("../utils/myAppError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/APIFeatures");

const addSolution = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    successMeasure,
    totalBudget,
    timeFrame,
    itemsNeeded,
    problemsSolved,
  } = req.body;

  const solution = await Solution.create({
    title,
    description,
    successMeasure,
    totalBudget,
    timeFrame,
    itemsNeeded,
    problemsSolved,
  });

  //  send status code 201
  res.status(201).json({
    status: "success",
    data: {
      solution,
    },
  });
});

const getSingleSolution = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide a solution id", 400));
  }

  const solution = await Solution.findOne({ _id: id });

  if (!solution) {
    return next(new AppError(`No solution with id: ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      solution,
    },
  });
});

const getAllSolutions = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Solution.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const solutions = await features.query;

  res.status(200).json({
    status: "success",
    results: solutions.length,
    data: {
      solutions,
    },
  });
});

const deleteSolution = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide a solution id", 400));
  }

  const solution = await Solution.findOneAndDelete({ _id: id });

  if (!solution) {
    return next(new AppError(`No solution with id: ${id}`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  addSolution,
  getSingleSolution,
  getAllSolutions,
  deleteSolution,
};
