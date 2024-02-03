/* 

    TODO: 
        
        1. API Authentication for Users to access API with API_SECRET
        2. Set User Permissions
        3. Configure Schemas - Parameters, Requests, Responses
        
*/

// Import Section
import mongoose from "mongoose";

// Schema Section

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const middlewareSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const headerSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  secured: {
    type: Boolean,
    required: true,
  },
});

const endPointSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    required: true,
  },
  algorithm: {
    type: String,
    required: true,
  },
  middlewares: [middlewareSchema],
  headers: [headerSchema],
  // parameters: [parameterSchema],
  // response: [responseSchema],
  // requests: [requestSchema],
  notes: [noteSchema],
});

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  endPoints: [endPointSchema],
  notes: [noteSchema],
});

const apiSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    baseURL: {
      type: String,
      required: true,
    },
    modules: [moduleSchema],
    notes: [noteSchema],
  },
  { timestamps: true }
);

// Mongoose Model
const API = mongoose.model("API", apiSchema);

// Export Section
export { API };
