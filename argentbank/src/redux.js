import { configureStore, createSlice } from '@reduxjs/toolkit'

const connectedUser = createSlice({
    name: 'login',
    initialState: [
        {connected: false, name: '', email: ''}
    ],
    reducers: {
        logIn: (state, action) => {
            // {type : 'login/logIn', payload: {id: 1, name: 'toto', email: 'toto@toto'}}
            const user = state[0];
            user.connected = true;
            user.email = action.payload.email;
            user.token = action.payload.token;
        },

        logOut: (state, action) => {
            // {type : 'login/logOut', payload: null}
            const user = state[0];
            user.connected = false;
        },
    }
});

// Action Creator
export const { logIn, logOut } = connectedUser.actions;

// Export Store
export const storeRedux = configureStore({
    reducer: {
        connectedUser: connectedUser.reducer
    }
});
