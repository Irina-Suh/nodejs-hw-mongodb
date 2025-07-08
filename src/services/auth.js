import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import { APP_DOMAIN, FIFTEEN_MINUTES, JWT_SECRET, REFRESH_EXPIRES_IN, RESET_EXPIRES_IN, SESSION_COOKIE_EXPIRES } from '../constants/index.js';
import { sendEmail } from '../utils/mailer.js';

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const userWithoutPassword = newUser.toObject();
  delete userWithoutPassword.password;

  return userWithoutPassword;
};


export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, 'Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createHttpError(401, 'Invalid email or password');

  const payload = { userId: user._id };
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: FIFTEEN_MINUTES });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });

  await Session.deleteMany({ userId: user._id });

  const now = new Date();
  const accessTokenValidUntil = new Date(now.getTime() + FIFTEEN_MINUTES * 1000);
  const refreshTokenValidUntil = new Date(now.getTime() + SESSION_COOKIE_EXPIRES);

  const newSession = await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken, sessionId: newSession._id };
};


export const refresh = async (refreshToken) => {
  let payload;

  try {
    payload = jwt.verify(refreshToken, JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const existingSession = await Session.findOne({ refreshToken });

  if (!existingSession) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.deleteOne({ _id: existingSession._id });

  const newPayload = { userId: payload.userId };
  const accessToken = jwt.sign(newPayload, JWT_SECRET, { expiresIn: FIFTEEN_MINUTES });


  const newRefreshToken = jwt.sign(newPayload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES_IN });


  const now = new Date();
  const accessTokenValidUntil = new Date(now.getTime() + FIFTEEN_MINUTES * 1000);
  const refreshTokenValidUntil = new Date(now.getTime() + REFRESH_EXPIRES_IN * 1000);

  const newSession = await Session.create({
    userId: payload.userId,
    accessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken: newRefreshToken , sessionId: newSession._id};
};


export const logout = async (refreshToken) => {
  await Session.deleteOne({ refreshToken });
};

// Надіслати листа для скидання паролю
export const sendResetEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: RESET_EXPIRES_IN });
  const resetLink = `${APP_DOMAIN}/reset-password?token=${token}`;

  try {
    await sendEmail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });
  } catch (err) {
    console.error('Email send error:', err.message);
    throw createHttpError(500, 'Failed to send the email, please try again later.');
  }
};