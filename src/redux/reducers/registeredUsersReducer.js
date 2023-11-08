import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    users: [],
    lastEvaluatedKey: null,
}

const registeredUsersSlice = createSlice({
    name: 'registeredUsers',
    initialState: initialState,
    reducers: {
        setRegisteredUsers: (state, action) => {
            //TODO: concat users when making extra calls
            //const newUsers = state.users.concat(action.payload.users);
            const lastEvaluatedKey = action.payload.lastEvaluatedKey ?? null;
            return {
                ...state,
                users: action.payload.users,
                lastEvaluatedKey
            }
        },
        restoreRegisteredUsers: () => {
            return initialState;
        }
    }
})

export const { setRegisteredUsers, restoreRegisteredUsers } = registeredUsersSlice.actions
export default registeredUsersSlice.reducer
