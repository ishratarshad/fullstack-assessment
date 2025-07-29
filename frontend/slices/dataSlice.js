// slices/dataSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get(`${API_URL}/api/data`)
  return response.data
})

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default dataSlice.reducer
