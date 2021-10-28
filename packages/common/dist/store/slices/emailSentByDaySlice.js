import { createAction, createSlice } from '@reduxjs/toolkit';
var initialState = {
    emailSentByDayLoading: false,
    emailSentByDay: undefined,
};
// Actions
export var setEmailSentByDayLoading = createAction('emailSentByDay/setEmailSentByDayLoading');
export var setEmailSentByDay = createAction('emailSentByDay/setEmailSentByDay');
// Reducer
export var emailSentByDaySlice = createSlice({
    name: 'emailSentByDay',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(setEmailSentByDayLoading, function (state, action) {
            state.emailSentByDayLoading = action.payload;
        })
            .addCase(setEmailSentByDay, function (state, action) {
            state.emailSentByDay = action.payload;
        });
    },
});
export default emailSentByDaySlice.reducer;
// selectors & getters
export var getEmailSentByDayLoading = function (state) {
    return state.emailSentByDay.emailSentByDayLoading;
};
export var getEmailSentByDay = function (state) { return state.emailSentByDay.emailSentByDay; };
//# sourceMappingURL=emailSentByDaySlice.js.map