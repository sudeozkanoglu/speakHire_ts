import Joi, { not } from "joi";

export const userUpdateValidation = Joi.object({
  userName: Joi.string().trim().min(3).max(30).optional(),
  firstName: Joi.string().trim().min(2).max(30),
  lastName: Joi.string().trim().min(2).max(30),
  email: Joi.string().trim().email(),
  password: Joi.string().trim().min(6),
  position: Joi.string().trim().max(100),
  phone: Joi.string()
    .pattern(/^\+?[0-9\s-]{10,20}$/)
    .messages({
      "string.pattern.base": `"phone" must contain only numbers, spaces or dashes`,
    })
    .allow(""),
  bio: Joi.string().trim().max(500).allow(""),
  location: Joi.string().trim().max(100).allow(""),

  socialMedia: Joi.object({
    linkedin: Joi.string().trim().uri().allow(""),
    github: Joi.string().trim().uri().allow(""),
  }).optional(),

  careerInfo: Joi.object({
    currentPosition: Joi.string().trim().max(100).allow(""),
    experienceLevel: Joi.string().trim().max(100).allow(""),
  }).optional(),

  skills: Joi.array().items(Joi.string().trim().max(50)).optional(),

  education: Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().optional(),
        school: Joi.string().trim().max(100).allow(""),
        fieldOfStudy: Joi.string().trim().max(100).allow(""),
        startYear: Joi.number().integer().min(1900).max(2100).optional(),
        endYear: Joi.number()
          .integer()
          .min(1900)
          .max(2100)
          .when("startYear", {
            is: Joi.number().integer().min(1900).max(2100),
            then: Joi.number().greater(Joi.ref("startYear")),
            otherwise: Joi.number().integer().min(1900).max(2100),
          })
          .optional()
          .messages({
            "number.greater": `"endYear" must be greater than "startYear"`,
          }),
        gpa: Joi.number().min(0).max(4).optional(),
      })
    )
    .optional(),
    settings: Joi.object({
      notifications: Joi.object({
        emailInvitations: Joi.boolean().optional(),
        interviewResults: Joi.boolean().optional(),
      }).optional(),
      privacy: Joi.object({
        profileVisibility: Joi.boolean().optional(),
        twoFactorAuth: Joi.boolean().optional(),
      }).optional(),
    }).optional(),
    
    mode: Joi.string().valid("replace", "diff").optional(),
});
