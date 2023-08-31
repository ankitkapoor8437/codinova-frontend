import { configureStore } from "@reduxjs/toolkit";
import exchangeDataDetails from "../feature/exchangeDataSlice";


//  Redux store using configureStore
export const store = configureStore(
    {
        reducer: {
            app: exchangeDataDetails,
        },
    }
)
