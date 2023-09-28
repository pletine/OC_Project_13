import { configureStore, createSlice } from '@reduxjs/toolkit'

const connectedUser = createSlice({
    name: 'login',
    initialState: [
        {connected: false, email: '', id: '', firstname: '', lastname: ''}
    ],
    reducers: {
        logIn: (state, action) => {
            // {type : 'login/logIn', payload: {email: 'toto@toto', token: '5fds8496fez'}}
            const user = state[0];
            user.connected = true;
            user.id = action.payload.id;
            user.email = action.payload.email;
            user.firstname = action.payload.firstname;
            user.lastname = action.payload.lastname;
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
