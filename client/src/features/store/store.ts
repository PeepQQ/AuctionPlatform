import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/shared/api";
import { createLogger } from "redux-logger";

const logger = createLogger({
    collapsed: true
})

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaulMiddleware) => 
        getDefaulMiddleware().concat(api.middleware).concat(logger)
})

export type RootState = ReturnType<typeof store.getState>