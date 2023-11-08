import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bookedClasses: [],
    purchasedPackages: [],
    userType: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setProfile: (_, action) => {
            delete action.payload.message
            delete action.payload.statusCode
            return action.payload
        },
        replaceBookedClasses: (state, action) => {
            const newClasses = action.payload;
            return {
                ...state,
                bookedClasses: newClasses
            }
        },
        restoreProfile: () => {
            return initialState
        },
        replaceUserInfo: (state, action) => {
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        }
    }
})

export const { setProfile, restoreProfile, replaceBookedClasses, replaceUserInfo } = userSlice.actions
export default userSlice.reducer
