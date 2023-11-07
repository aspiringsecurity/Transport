export interface IProblem {
  _id: string;
  title: string;
  description: string;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProblemVote {
  _id: string;
  upvotedBy: string;
  problem: string;
  createdAt: string;
  updatedAt: string;
}
