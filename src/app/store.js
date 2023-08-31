import { configureStore } from "@reduxjs/toolkit";
import exchangeDataDetails from "../feature/exchangeDataSlice";


export const store = configureStore(
    {
        reducer: {
            app: exchangeDataDetails,
        },
    }
)
