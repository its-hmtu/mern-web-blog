import jwt from "jsonwebtoken";

const generateAccessToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "30d",
  });


  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 100, // 30 days in milliseconds
  });

  return token;
};

const generateRefreshToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN, {
    expiresIn: "365d",
  });

  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 365 * 24 * 60 * 60 * 100, // 365 days in milliseconds
  });

  return token;
};

export { generateAccessToken, generateRefreshToken };
