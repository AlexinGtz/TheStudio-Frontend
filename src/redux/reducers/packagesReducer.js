import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    pilates: [],
    wellness: [],
}

const packagesSlice = createSlice({
    name: 'packages',
    initialState: initialState,
    reducers: {
        setAllPackages: (_, action) => {
            const newState = { loading: false, pilates: action.payload.pilates, wellness: action.payload.wellness };
            return newState;
        },
        restorePackages: () => {
            return initialState;
        }
    }
})

export const { setAllPackages, restorePackages } = packagesSlice.actions
export default packagesSlice.reducer
