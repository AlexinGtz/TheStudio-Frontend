import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: null,
};

const classTypeSlice = createSlice({
    name: 'classType',
    initialState: initialState,
    reducers: {
        setClassType: (_, action) => {
            return action.payload;
        },
        restoreClassType: () => {
            return initialState;
        }
    }
})

export const { setClassType, restoreClassType } = classTypeSlice.actions
export default classTypeSlice.reducer
