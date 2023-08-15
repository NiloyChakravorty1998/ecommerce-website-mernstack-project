import express from 'express';
import { registerUser } from '../../controllers/user/registerUser';
import { getUsers } from '../../controllers/user/getUsers';
import { authUser } from '../../controllers/user/authUser';
import { logoutUser } from '../../controllers/user/logoutUser';
import { getUserProfile } from '../../controllers/user/getUserProfile';
import { updateUserProfile } from '../../controllers/user/updateUserProfile';
import { deleteUser } from '../../controllers/user/deleteUser';
import { getUserById } from '../../controllers/user/getUserById';
import { updateUser } from '../../controllers/user/updateUser';
import { protect, admin } from '../../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.route('/').post(registerUser).get(protect, admin, getUsers);
userRouter.post('/auth', authUser);
userRouter.post('/logout', logoutUser);
userRouter
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
userRouter
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default userRouter;