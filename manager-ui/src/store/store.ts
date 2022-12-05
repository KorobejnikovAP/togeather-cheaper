import { configureStore } from '@reduxjs/toolkit'
import auth from './reducers/auth'
import products from './reducers/products'
import collections from './reducers/collections'


export const store = configureStore({
  reducer: {
    auth,
    products,
    collections,
  },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

