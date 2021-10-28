/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createSlice } from '@reduxjs/toolkit';
var initialState = {
    sort: 'sent',
    order: 1,
    sent: '',
    from: '',
    to: '',
    subject: '',
    allText: '',
    body: '',
    emailListPage: 0,
};
// Actions
export var setSort = createAction('query/setSort');
export var setOrder = createAction('query/setOrder');
export var setSent = createAction('query/setSent');
export var setFrom = createAction('query/setFrom');
export var setTo = createAction('query/setTo');
export var setSubject = createAction('query/setSubject');
export var setAllText = createAction('query/setAllText');
export var setBody = createAction('query/setBody');
export var setEmailListPage = createAction('query/setEmailListPage');
export var clearSearch = createAction('query/clearSearch');
// Reducer
export var querySlice = createSlice({
    name: 'query',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(setSort, function (state, action) {
            state.sort = action.payload;
        })
            .addCase(setOrder, function (state, action) {
            state.order = action.payload;
        })
            .addCase(setSent, function (state, action) {
            state.sent = action.payload;
        })
            .addCase(setFrom, function (state, action) {
            state.from = action.payload;
        })
            .addCase(setTo, function (state, action) {
            state.to = action.payload;
        })
            .addCase(setSubject, function (state, action) {
            state.subject = action.payload;
        })
            .addCase(setAllText, function (state, action) {
            state.allText = action.payload;
        })
            .addCase(setBody, function (state, action) {
            state.body = action.payload;
        })
            .addCase(setEmailListPage, function (state, action) {
            state.emailListPage = action.payload;
        })
            // TODO convert clearsearch to basic fn
            .addCase(clearSearch, function (state, action) {
            state.allText = '';
            state.body = '';
            state.emailListPage = 0;
            state.from = '';
            state.order = 1;
            state.sort = 'sent';
            state.sent = '';
            state.subject = '';
            state.to = '';
        });
    },
});
export default querySlice.reducer;
// selectors & getters
export var getAllText = function (state) { return state.query.allText; };
export var getBody = function (state) { return state.query.body; };
export var getEmailListPage = function (state) {
    return state.query.emailListPage;
};
export var getFrom = function (state) { return state.query.from; };
export var getOrder = function (state) { return state.query.order; };
export var getSort = function (state) { return state.query.sort; };
export var getSent = function (state) { return state.query.sent; };
export var getSubject = function (state) { return state.query.subject; };
export var getTo = function (state) { return state.query.to; };
// TODO merge with getQueryObj
export var getQuery = function (state) { return ({
    allText: state.query.allText,
    body: state.query.body,
    emailListPage: state.query.emailListPage,
    from: state.query.from,
    order: state.query.order,
    sent: state.query.sent,
    sort: state.query.sort,
    subject: state.query.subject,
    to: state.query.to,
}); };
//# sourceMappingURL=querySlice.js.map