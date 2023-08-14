import { Request, Response } from "express";
import asyncHandler from "../../middleware/asyncHandler";

// @access  Public
const authUser = asyncHandler(async (req : Request, res : Response) => {
  res.send('auth user');
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req : Request, res: Response) => {
  res.send('register user');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req : Request, res: Response) => {
  res.send('get user profile');
});

// @desc    Logout user
// @route   GET /api/users/profile
// @access  Private
const logoutUser = asyncHandler(async(req : Request, res: Response) => {
    res.send('logout user');
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req : Request, res: Response) => {
  res.send('update user profile');
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req : Request, res: Response) => {
  res.send('get users');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req : Request, res: Response) => {
  res.send('delete user');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req : Request, res: Response) => {
  res.send('get user by id');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req : Request, res: Response) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};