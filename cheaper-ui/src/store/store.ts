import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import auth from './reducers/auth'
import collections from './reducers/collections';

const store = configureStore({
  reducer: {
    auth,
    collections,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
