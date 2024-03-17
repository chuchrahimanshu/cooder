// AUTH

export {
  checkUserSignedIn,
  generateChangePasswordToken,
  generateEmailVerificationToken,
  generateTwoFactorVerificationToken,
  userSignIn,
  userSignOut,
  userSignUp,
  verifyEmailVerificationToken,
  verifyNewUser,
  verifyTokenAndChangePassword,
  verifyTwoFactorVerification,
  verifyUsername,
  authUsingGoogle,
  chooseUsername,
  getUserDetails,
} from "./auth/auth.controller.js";

// USER

export {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "./user/user.controller.js";

// USER - SOCIAL - POST

export {
  createPost,
  deletePost,
  getAllUserPosts,
  getSinglePost,
  updatePost,
  getAllFollowingPosts,
} from "./user/social/post.controller.js";

// USER - SOCIAL - COMMENT

export {
  createComment,
  deleteComment,
  getAllComments,
  getComment,
  updateComment,
} from "./user/social/comment.controller.js";

// USER - SOCIAL - REPLY

export {
  createReply,
  deleteReply,
  getAllReplies,
  getReply,
  updateReply,
} from "./user/social/reply.controller.js";

// USER - SOCIAL - REACTION

export {
  reactionOnComment,
  reactionOnPost,
  reactionOnReply,
} from "./user/social/reaction.controller.js";

// USER - TASK

export {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from "./user/task/task.controller.js";

// USER - TASK - CARD

export {
  createCard,
  deleteCard,
  getAllCards,
  getSingleCard,
  updateCard,
} from "./user/task/card.controller.js";

// USER - TASK - NOTE

export {
  createNote,
  deleteNote,
  getAllNotes,
  getSingleNote,
  updateNote,
} from "./user/task/note.controller.js";

// USER - SNIPPET

export {
  createSnippet,
  deleteSnippet,
  getAllSnippets,
  getSingleSnippet,
  updateSnippet,
} from "./user/snippet/snippet.controller.js";

// USER - SNIPPET - UPVOTE

export { upvoteOnSnippet } from "./user/snippet/upvote.controller.js";

// USER - SNIPPET - DOWNVOTE

export { downvoteOnSnippet } from "./user/snippet/downvote.controller.js";

// USER - SNIPPET - FAVOURITES

export { addSnippetToFavourites } from "./user/snippet/favourites.controller.js";

// USER - FOLLOW

export {
  userFollowRequests,
  createRequest,
  acceptRequest,
  rejectRequest,
  removeFollower,
  unfollowUser,
  getFollowers,
  getFollowing,
  notFollowingUsers,
} from "./user/follow/follow.controller.js";

// USER - DEBUGGER - TICKET

export {
  createTicket,
  deleteTicket,
  getAllTickets,
  getSingleTicket,
  updateTicket,
} from "./user/debugger/ticket.controller.js";

// USER - DEBUGGER - RATING

export { addTicketRating } from "./user/debugger/rating.controller.js";

// USER - DEBUGGER - SOLUTION

export {
  createSolution,
  deleteSolution,
  getAllSolutions,
  getSingleSolution,
  updateSolution,
} from "./user/debugger/solution.controller.js";

// USER - DEBUGGER - SOLVED

export { markSolutionSolved } from "./user/debugger/solved.controller.js";

// USER - DEBUGGER - UNSOLVED

export { markSolutionUnsolved } from "./user/debugger/unsolved.controller.js";
