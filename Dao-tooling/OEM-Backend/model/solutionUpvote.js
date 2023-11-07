const mongoose = require("mongoose");
const Solution = require("./solutionModel");

solutionUpvoteSchema = new mongoose.Schema(
  {
    upvotedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    solution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Solution",
    },
  },
  {
    timestamps: true,
  }
);

solutionUpvoteSchema.index({ solution: 1, upvotedBy: 1 }, { unique: true });

solutionUpvoteSchema.statics.calcTotalUpvotes = async function (solutionId) {
  const total = await this.countDocuments({ solution: solutionId });

  await Solution.findByIdAndUpdate(solutionId, { upvotes: total });
};

solutionUpvoteSchema.post("save", function (doc, next) {
  this.constructor.calcTotalUpvotes(this.solution);
  next();
});

/*query middleware does not have access to the document but only to the query */
solutionUpvoteSchema.pre(/^findOneAnd/, async function (next) {
  // this points to the current query
  const temp = { ...this };

  this.r = await this.findOne().clone();

  /* Setting 'this.op' to the current query, for 
  some reason this.op changes to 'findOne' after the above query
   is executed which will stop the query from moving to the preferred
    middleware. So I'm just resetting it below*/
  this.op = temp.op;

  next();
});

solutionUpvoteSchema.post(/^findOneAnd/, async function (doc, next) {
  // this.r = await this.findOne(); does NOT work here, query has already executed

  await this.r.constructor.calcTotalUpvotes(this.r.solution);

  next();
});

const SolutionUpvote = new mongoose.model(
  "SolutionUpvote",
  solutionUpvoteSchema
);

module.exports = SolutionUpvote;
