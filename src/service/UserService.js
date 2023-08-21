import { loginUser } from "../api/auth";
//import { loginUser, fetchPersonnel, postUser, putUser, postPassword } from '../api/auth';
export default class UserService {
  login(data) {
    return loginUser(data);
  }
  // getUsersList(params) {
  //     return fetchPersonnel(params)
  // }
  // createUser(data) {
  //     return postUser(data)
  // }
  // updateUser(username, data) {
  //     return putUser(username, data)
  // }
  // updatePassword(data) {
  //     return postPassword(data)
  // }
}
