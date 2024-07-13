import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });


  // res.cookie(process.env.ACCESS_TOKEN, token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  //   maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  // });

  return token;
};

const generateRefreshToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  });
};

export { generateAccessToken, generateRefreshToken };
