import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/blogReducer'
// import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: reducer,
    user: userReducer,
    users: usersReducer,
    // filter: filterReducer,
    notification: notificationReducer,
  },
})

export default store
