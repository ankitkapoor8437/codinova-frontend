import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Read Exchange Data from the DB
export const readData = createAsyncThunk("readData", async (_, { rejectWithValue }) => {
    try {
        const exchangeDataResponse = await fetch("http://localhost:7000/addExchangeData");
        const exchangeIconResponse = await fetch("http://localhost:7000/addExchangeIcon");

        if (!exchangeDataResponse.ok || !exchangeIconResponse.ok) {
            // Handle non-successful responses
            const errorData = await exchangeDataResponse.json();
            const errorMessage = errorData.message || "Failed to fetch data";
            return rejectWithValue(errorMessage);
        }

        const exchangeData = await exchangeDataResponse.json();
        const exchangeIcon = await exchangeIconResponse.json();

        //Function to integrate the Data from two DB's  
        const combinedData = exchangeData.map(data => {
            const matchingIcon = exchangeIcon.find(icon => icon.exchange_id === data.exchange_id);
            return {
                ...data,
                icon_url: matchingIcon ? matchingIcon.url : null,
            };
        });

        return combinedData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Define the exchangeDataDetails slice
const exchangeDataDetails = createSlice({
    name: "Exchange Data",
    initialState: {
        // Initial state with exchangeData array, loading indicator, error, and searchData
        exchangeData: [],
        loading: false,
        error: null,
        searchData: [],
    },
    reducers: {
        // Function to Seach Data
        searchExchange: (state, action) => {
            state.searchData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Read User
            .addCase(readData.pending, (state) => {
                state.loading = true;
            })
            .addCase(readData.fulfilled, (state, action) => {
                state.loading = false;
                state.exchangeData = action.payload;
            })
            .addCase(readData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default exchangeDataDetails.reducer;
export const { searchExchange } = exchangeDataDetails.actions;
