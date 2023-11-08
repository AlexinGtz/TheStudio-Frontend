import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    data: [],
}

const packagesSlice = createSlice({
    name: 'packages',
    initialState: initialState,
    reducers: {
        setAllPackages: (_, action) => {
            const newState = { loading: false, data: action.payload };
            return newState;
        },
        restorePackages: () => {
            return initialState;
        }
    }
})

export const { setAllPackages, restorePackages } = packagesSlice.actions
export default packagesSlice.reducer
