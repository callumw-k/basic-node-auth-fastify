import bcryptjs from "bcryptjs";

const { genSalt, hash } = bcryptjs;

export async function registerUser(email, password) {
  const { user } = await import("../user/user.js");
  //generate the salt
  const salt = await genSalt(10);
  //hash with salt
  const hashedpassword = await hash(password, salt);
  console.log(hashedpassword);
  //store hash in database
  const res = await user.insertOne({ email, password: hashedpassword });
  return res.insertedId;

  //return success
}
