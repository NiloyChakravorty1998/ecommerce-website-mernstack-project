import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../../controllers/user/userController';


const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(getUsers);
userRouter.post('/auth', authUser);
userRouter.post('/logout', logoutUser);
userRouter
  .route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);
userRouter
  .route('/:id')
  .delete(deleteUser)
  .get(getUserById)
  .put(updateUser);

export default userRouter;