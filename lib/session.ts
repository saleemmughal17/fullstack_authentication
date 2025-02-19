export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "user_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Set secure only in production
  },
};
