import { check } from "express-validator";

export const userValidationSchema = [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
    check("password").notEmpty().withMessage("Password cannot be empty"),
    check("phoneNumber").notEmpty().withMessage("Mobile Number is required"),
    check("gender").not().isEmpty().withMessage("Gender is required"),
    check("dob").notEmpty().withMessage("Date of Birth is required").isISO8601().toDate(),
];



