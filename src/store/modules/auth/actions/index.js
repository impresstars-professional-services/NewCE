import { initializeAction } from './initialize'
import { loginAction } from './login'
import { logoutAction } from './logout'
import { updateProfileAction } from './updateProfile'

export default {
  initialize: initializeAction,
  login: loginAction,
  logout: logoutAction,
  updateProfile: updateProfileAction
}