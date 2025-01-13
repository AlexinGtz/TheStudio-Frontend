import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    pilates: [],
    wellness: [],
    combined: []
}

const packagesSlice = createSlice({
    name: 'packages',
    initialState: initialState,
    reducers: {
        setAllPackages: (_, action) => {
            const newState = { loading: false, pilates: action.payload.pilates, wellness: action.payload.wellness, combined: action.payload.combined };
            return newState;
        },
        restorePackages: () => {
            return initialState;
        }
    }
})

export const { setAllPackages, restorePackages } = packagesSlice.actions
export default packagesSlice.reducer
