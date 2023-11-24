import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import classesReducer from './reducers/classesReducer'
import packagesReducer from './reducers/packagesReducer'
import registeredUsersReducer from './reducers/registeredUsersReducer'
import loadingReducer from './reducers/loadingReducer'


export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    classes: classesReducer,
    packages: packagesReducer,
    registeredUsers: registeredUsersReducer,
    loading: loadingReducer
  }
})