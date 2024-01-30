// Import Section
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// User Schema - Used by both Personal and Professional
const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  dateAchieved: {
    type: Date,
  },
  referenceLink: {
    type: String,
  },
  issuer: {
    type: String,
  },
  associated: {
    type: String,
  },
  image: {
    type: String,
  },
});

// User Schema - Personal Sub - Schemas
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
});

const educationSchema = new mongoose.Schema({
  school: {
    type: String,
  },
  degree: {
    type: String,
  },
  fieldOfStudy: {
    type: String,
  },
  location: {
    type: String,
  },
  grade: {
    type: String,
  },
  description: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  achievements: [achievementSchema],
  currentStatus: {
    type: Boolean,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

const socialProfileSchema = new mongoose.Schema({
  platform: {
    type: String,
  },
  username: {
    type: String,
  },
  logo: {
    type: String,
  },
  platformLink: {
    type: String,
  },
  profileLink: {
    type: String,
  },
});

// User Schema - Professional Sub - Schemas
const developerProfileSchema = new mongoose.Schema({
  platform: {
    type: String,
  },
  username: {
    type: String,
  },
  logo: {
    type: String,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
});

const personalWebsiteSchema = new mongoose.Schema({
  displayName: {
    type: String,
  },
  link: {
    type: String,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const experienceSchema = new mongoose.Schema({
  position: {
    type: String,
  },
  employmentType: {
    type: String,
  },
  company: {
    type: String,
  },
  industry: {
    type: String,
  },
  description: {
    type: String,
  },
  leadershipRole: {
    type: String,
  },
  technologiesUsed: [
    {
      type: String,
    },
  ],
  industries: [
    {
      type: String,
    },
  ],
  location: {
    type: String,
  },
  locationType: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  achievements: [achievementSchema],
  officeCultureRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  workLifeBalanceRating: {
    type: Number,
    min: 1,
    max: 5,
  },
  currentStatus: {
    type: Boolean,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  objective: {
    type: String,
  },
  repositoryLink: {
    type: String,
  },
  websiteLink: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  videos: [
    {
      type: String,
    },
  ],
  teamMembers: [
    {
      name: String,
      role: String,
    },
  ],
  technologiesUsed: [
    {
      type: String,
    },
  ],
  skills: [
    {
      type: String,
    },
  ],
  achievements: [achievementSchema],
  tags: [
    {
      type: String,
    },
  ],
  currentStatus: {
    type: Boolean,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
});

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
  },
  issuedBy: {
    type: String,
  },
  dateIssued: {
    type: Date,
  },
  expirationDate: {
    type: Date,
  },
  credentialID: {
    type: String,
    trim: true,
  },
  credentialURL: {
    type: String,
    trim: true,
  },
});

// Combined User Schema - COMPLETE ONE
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
    },
    dateOfBirth: {
      type: Date,
    },
    spokenLanguages: [
      {
        type: String,
      },
    ],
    avatar: {
      type: String,
      required: true,
      default: "https://i.ibb.co/Vxnhy4r/Default-Avatar.jpg",
    },
    cover: {
      type: String,
      required: true,
      default: "https://i.ibb.co/mC4j0w1/Default-Background.jpg",
    },
    address: addressSchema,
    education: [educationSchema],
    socialProfiles: [socialProfileSchema],
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
      required: true,
    },
    userAgent: {
      type: Array,
      required: true,
    },
    about: {
      type: String,
    },
    bio: {
      type: String,
    },
    currentTechStack: [
      {
        type: String,
      },
    ],
    resume: {
      type: String,
    },
    developerProfiles: [developerProfileSchema],
    personalWebsites: [personalWebsiteSchema],
    experience: [experienceSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    refreshToken: {
      type: String,
    },
    emailVerification: {
      type: String,
    },
    twoFactorVerification: {
      type: String,
    },
    passwordVerification: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose Middlewares
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.BCRYPTJS_SALT)
    );
  }
  next();
});

// Mongoose Custom Methods
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return await JWT.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return await JWT.sign(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Mongoose Model
const User = mongoose.model("User", userSchema);

// Export Section
export { User };
