import { configureStore } from "@reduxjs/toolkit";

import requestReducer from "./slices/requestSlice";
import { requestApi } from "./slices/requestSlice";

export const store = configureStore({
  reducer: {
    requests: requestReducer,
    [requestApi.reducerPath]: requestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(requestApi.middleware),
});