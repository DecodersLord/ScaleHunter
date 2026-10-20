import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/authentication.js";
import { createUser, findUserByEmail } from "../db/queries/users.js"; 

const dummyUsers = [];

export const register = async (req, res, next) => {

  const { email, password, hunterName } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const token = generateToken({ email });

  if (token) {
    // dummyUsers.push({ user: user, password: hash });
    const result = JSON.parse(await createUser(email, hash, hunterName));
    
    if (result.status === "OK") {
      res.status(201).json({ token });
    } else {
      res.status(501).json({message: "Error creating new hunter profile"});
    }
    
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // let userFound = dummyUsers.find((u) => u.user === user);

  const userFound = await findUserByEmail(email);

  if (!userFound || userFound.status === "failed") {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  let authenticated = await bcrypt.compare(password, userFound.password_hash);

  if (!authenticated) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = generateToken({ email });

  if (token) {
    res.status(200).json({ token });
  }
};
