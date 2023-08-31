import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../common/generateToken.js";
import { paymentModel } from "../models/paymentModel.js";

export const userRegister = async (req, res) => {
  try {
    const { user_name, email_id, password, confirmPassword } = req.body;

    //check all fields
    if (!user_name || !email_id || !password || !confirmPassword) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    //check password and confirm password
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("passwords do not match");
    }
    //check if user already exists
    const userExist = await userModel.findOne({ email_id });
    if (userExist) {
      res.status(400);
      throw new Error("This email id already exists");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      user_name,
      email_id,
      password: hashedPassword,
    });
    //send jwt token
    if (user) {
      const userNew = {
        _id: user._id,
        user_name: user.user_name,
        email_id: user.email_id,
        token: generateToken(user._id),
      };
      res.status(201).json(userNew);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email_id, password } = req.body;
    //check data
    if (!email_id || !password) {
      res.status(400);
      throw new Error("Email or password not found");
    }
    //check for user email
    const user = await userModel.findOne({ email_id });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userNew = {
        _id: user._id,
        user_name: user.user_name,
        email_id: user.email_id,
        token: generateToken(user._id),
      };
      res.json(userNew);
    } else {
      res.status(400);
      throw new Error("Invalid email_id or password");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    //get user data without password and lean() to get a clean json
    const user = await userModel.findById(req.user.id, { password: 0 }).lean();
    //check if user id exist in payment model
    const userExist = await paymentModel.findOne({ user_id: req.user.id });

    res.json({ ...user, isPaid: userExist ? true : false });
  } catch (error) {
    res.status(400).json({ message: "User not found !" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    // const {
    //   email_id,
    //   first_name,
    //   last_name,
    //   mobile_number,
    //   address_line1,
    //   street,
    //   city,
    //   zipcode,
    // } = req.body;
    const updateData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validation on update
      }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
