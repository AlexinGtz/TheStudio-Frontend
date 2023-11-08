import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const classesSlice = createSlice({
    name: 'classes',
    initialState: initialState,
    reducers: {
        setClasses: (_, action) => {
            return action.payload;
        },
        restoreClasses: () => {
            return initialState;
        }
    }
})

export const { setClasses, restoreClasses } = classesSlice.actions
export default classesSlice.reducer
