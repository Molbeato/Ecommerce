import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth/login";

const emptyState = {
    id: '',
    token: '',
    fullName: '',
    email: '',
    isLogged: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: JSON.parse(localStorage.getItem('sessionData')) ?? emptyState,
    reducers: {
      updateUserData(state, action){
        const newUserData = action.payload;

        state.id = newUserData.id;
        state.fullName = newUserData.fullName;
        state.email = newUserData.email;

        localStorage.setItem('sessionData', JSON.stringify({...state}))
    },
      updateToken(state, action){
        const newToken = action.payload;

        state.token = newToken;

        localStorage.setItem('sessionData', JSON.stringify({...state}))
      },
      startSession(state){
        state.isLogged = true;

        localStorage.setItem('sessionData', JSON.stringify({...state}))
      },
      reset(){
        localStorage.removeItem('sessionData');

        return emptyState;
      },  
    },
});

export const { updateUserData, updateToken, startSession, reset } =
    authSlice.actions;

export const startSessionThunk = ({ email, password }) => async (dispatch) => {
    const sessionData = await login({ email, password });

    const userData = {
        id: sessionData.user.id,
        fullName: `${sessionData.user.firstName} ${sessionData.user.lastName}`,
        email: sessionData.user.email
    };

    dispatch(updateUserData(userData));
    dispatch(updateToken(sessionData.token));
    dispatch(startSession());
};

export default authSlice.reducer;