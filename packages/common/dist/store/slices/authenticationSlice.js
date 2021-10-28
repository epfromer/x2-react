import { createAction, createSlice } from '@reduxjs/toolkit';
var initialState = {
    authenticated: false,
    username: '',
};
// Actions
export var setAuthenticated = createAction('authentication/setAuthenticated');
export var setUsername = createAction('authentication/setUsername');
// Reducer
export var authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(setAuthenticated, function (state, action) {
            state.authenticated = action.payload;
        })
            .addCase(setUsername, function (state, action) {
            state.username = action.payload;
        });
    },
});
export default authenticationSlice.reducer;
// selectors & getters
export var getAuthenticated = function (state) { return state.authentication.authenticated; };
export var getUsername = function (state) { return state.authentication.username; };
export function signOut(store) {
    store.dispatch(setAuthenticated(false));
    store.dispatch(setUsername(''));
}
//# sourceMappingURL=authenticationSlice.js.map