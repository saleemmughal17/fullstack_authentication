export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "auth_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Set secure only in production
  },
};
