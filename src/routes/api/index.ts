import { json, Router, urlencoded } from 'express';
import { AuthRoute } from '../middlewares/auth.middleware';
import {
  changePasswordRequest,
  deleteUser,
  loginUserRequest,
  registerUserRequest,
  Validator
} from '../validations';
import { UserRoute } from './user.route';

const v1 = Router();
const baseUrl = '/api/v1';

const val = Validator.val;

const isAuth = AuthRoute.isAuthenticated;

v1.use(json({ limit: '50mb'}));
v1.use(urlencoded({ limit: '50mb', extended: false }));

// User
v1.post(`${baseUrl}/users/login`, val(loginUserRequest), UserRoute.loginUser);
v1.post(`${baseUrl}/users/register`, val(registerUserRequest), UserRoute.registerUser);
v1.delete(`${baseUrl}/users/delete`, isAuth, val(deleteUser), UserRoute.deleteUser);
v1.post(`${baseUrl}/users/change_password`, isAuth, val(changePasswordRequest), UserRoute.changePassword);

export default v1;
