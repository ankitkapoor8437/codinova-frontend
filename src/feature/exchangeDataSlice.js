import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



// Read User
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


// Delete User
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`https://64d3244967b2662bf3dbb8a0.mockapi.io/users/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        return { id, result };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const exchangeDataDetails = createSlice({
    name: "Exchange Data",
    initialState: {
        exchangeData: [],
        loading: false,
        error: null,
        searchData: [],
    },
    reducers: {
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
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.exchangeData = state.exchangeData.filter((data) => data.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
});

export default exchangeDataDetails.reducer;
export const { searchExchange } = exchangeDataDetails.actions;
