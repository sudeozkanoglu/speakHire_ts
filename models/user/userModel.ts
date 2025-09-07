import mongoose from "mongoose";

// HANGİ YAZIM DAHA DOĞRU ARAŞTIR !!!
// const NotificationsSchema = new Schema({
//   emailInvitations: { type: Boolean, default: false },
//   interviewResults: { type: Boolean, default: false },
// }, { _id: false });

// const PrivacySchema = new Schema({
//   profileVisibility: { type: Boolean, default: false },
//   twoFactorAuth: { type: Boolean, default: false },
// }, { _id: false });

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    position: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    // social media & bio
    socialMedia: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
    },
    bio: {
      type: String,
      default: "",
    },
    // career information
    careerInfo: {
       currentPosition: {
          type: String,
          default: "",
        },
        experienceLevel: {
          type: String,
          default: "",
        },
    },
    //skills
    skills: [
      {
        type: String,
        default: "",
      },
    ],
    //education history
    education: [
      {
        school: {
          type: String,
          default: "",
        },
        fieldOfStudy: {
          type: String,
          default: "",
        },
        startYear: {
          type: Number,
        },
        endYear: {
          type: Number,
        },
        gpa: {
          type: Number,
        },
      },
    ],
    //settings
    settings: {
      notifications: {
        emailInvitations: { type: Boolean, default: false },
        interviewResults: { type: Boolean, default: false },
      },
      privacy: {
        profileVisibility: { type: Boolean, default: false },
        twoFactorAuth: { type: Boolean, default: false },
      },

      //   settings: {
      //   notifications: { type: NotificationsSchema, default: {} },
      //   privacy:       { type: PrivacySchema,     default: {} },
      // },
    },
  },
  {
    minimize: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
