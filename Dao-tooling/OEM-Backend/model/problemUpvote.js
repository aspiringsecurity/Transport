const mongoose = require("mongoose");
const Problem = require("./problemModel");

problemUpvoteSchema = new mongoose.Schema(
  {
    upvotedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  },
  {
    timestamps: true,
  }
);

problemUpvoteSchema.index({ problem: 1, upvotedBy: 1 }, { unique: true });

problemUpvoteSchema.statics.calcTotalUpvotes = async function (problemId) {
  const total = await this.countDocuments({ problem: problemId });

  await Problem.findByIdAndUpdate(problemId, { upvotes: total });
};

problemUpvoteSchema.post("save", function (doc, next) {
  this.constructor.calcTotalUpvotes(this.problem);
  next();
});

/*query middleware does not have access to the document but only to the query */
problemUpvoteSchema.pre(/^findOneAnd/, async function (next) {
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

problemUpvoteSchema.post(/^findOneAnd/, async function (doc, next) {
  // this.r = await this.findOne(); does NOT work here, query has already executed

  await this.r.constructor.calcTotalUpvotes(this.r.problem);

  next();
});

const ProblemUpvote = new mongoose.model("ProblemUpvote", problemUpvoteSchema);

module.exports = ProblemUpvote;
