var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { createAction, createSlice } from '@reduxjs/toolkit';
import request, { gql } from 'graphql-request';
import { defaultLimit, x2Server } from '../../constants';
var initialState = {
    emailLoading: false,
    email: undefined,
    emailTotal: 0,
};
// Actions
export var setEmailLoading = createAction('email/setEmailLoading');
export var setEmail = createAction('email/setEmail');
export var appendEmail = createAction('email/appendEmail');
export var setEmailTotal = createAction('email/setEmailTotal');
// Reducer
export var emailSlice = createSlice({
    name: 'email',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(setEmailLoading, function (state, action) {
            state.emailLoading = action.payload;
        })
            .addCase(setEmail, function (state, action) {
            // console.log('setting email')
            state.email = action.payload;
        })
            .addCase(appendEmail, function (state, action) {
            var _a;
            if (state.email) {
                // console.log('appending email')
                (_a = state.email).push.apply(_a, action.payload);
            }
            else {
                // console.log('setting email')
                state.email = action.payload;
            }
        })
            .addCase(setEmailTotal, function (state, action) {
            state.emailTotal = action.payload;
        });
    },
});
export default emailSlice.reducer;
// selectors & getters
export var getEmailLoading = function (state) {
    return state.email.emailLoading;
};
export var getEmail = function (state) {
    return state.email.email;
};
export var getEmailTotal = function (state) {
    return state.email.emailTotal;
};
// graphQl query
function getQueryObj(store) {
    var state = store.getState();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var query = {
        skip: state.query.emailListPage * defaultLimit,
        limit: defaultLimit,
        sort: state.query.sort,
        order: state.query.order,
    };
    if (state.query.sent)
        query.sent = state.query.sent;
    if (state.query.from)
        query.from = state.query.from;
    if (state.query.to)
        query.to = state.query.to;
    if (state.query.subject)
        query.subject = state.query.subject;
    if (state.query.allText)
        query.allText = state.query.allText;
    if (state.query.body)
        query.body = state.query.body;
    return query;
}
export function getEmailAsync(store, append) {
    if (append === void 0) { append = false; }
    store.dispatch(setEmailLoading(true));
    var server = process.env.REACT_APP_X2_SERVER
        ? process.env.REACT_APP_X2_SERVER
        : x2Server;
    // console.log(server)
    var query = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    query getEmail(\n      $skip: Int\n      $limit: Int\n      $sort: String\n      $order: Int\n      $sent: String\n      $from: String\n      $to: String\n      $subject: String\n      $allText: String\n      $body: String\n    ) {\n      getEmail(\n        skip: $skip\n        limit: $limit\n        sort: $sort\n        order: $order\n        sent: $sent\n        from: $from\n        to: $to\n        subject: $subject\n        allText: $allText\n        body: $body\n      ) {\n        emails {\n          id\n          sent\n          sentShort\n          from\n          fromCustodian\n          to\n          toCustodians\n          cc\n          bcc\n          subject\n          body\n        }\n        total\n      }\n    }\n  "], ["\n    query getEmail(\n      $skip: Int\n      $limit: Int\n      $sort: String\n      $order: Int\n      $sent: String\n      $from: String\n      $to: String\n      $subject: String\n      $allText: String\n      $body: String\n    ) {\n      getEmail(\n        skip: $skip\n        limit: $limit\n        sort: $sort\n        order: $order\n        sent: $sent\n        from: $from\n        to: $to\n        subject: $subject\n        allText: $allText\n        body: $body\n      ) {\n        emails {\n          id\n          sent\n          sentShort\n          from\n          fromCustodian\n          to\n          toCustodians\n          cc\n          bcc\n          subject\n          body\n        }\n        total\n      }\n    }\n  "])));
    request(server + "/graphql/", query, getQueryObj(store))
        .then(function (data) {
        if (append) {
            store.dispatch(appendEmail(data.getEmail.emails));
        }
        else {
            store.dispatch(setEmail(data.getEmail.emails));
        }
        store.dispatch(setEmailTotal(data.getEmail.total));
        store.dispatch(setEmailLoading(false));
    })
        .catch(function (e) { return console.error(e); });
}
export var getEmailById = function (store, id) {
    var state = store.getState();
    if (!state.email.email || !state.email.email.length)
        return undefined;
    return state.email.email.find(function (e) { return e.id === id; });
};
export var getNextEmailId = function (store, id) {
    var state = store.getState();
    if (!state.email.email || !state.email.email.length)
        return undefined;
    var i = state.email.email.findIndex(function (e) { return e.id === id; });
    return i < state.email.email.length - 1
        ? state.email.email[i + 1].id
        : undefined;
};
export var getPreviousEmailId = function (store, id) {
    var state = store.getState();
    if (!state.email.email || !state.email.email.length)
        return undefined;
    var i = state.email.email.findIndex(function (e) { return e.id === id; });
    return i > 0 ? state.email.email[i - 1].id : undefined;
};
export var getEmailIndex = function (store, id) {
    var state = store.getState();
    if (!state.email.email || !state.email.email.length)
        return undefined;
    return state.email.email.findIndex(function (e) { return e.id === id; }) + 1;
};
export var getDateStr = function (date) {
    var month = (date.getMonth() + 1 + '').padStart(2, '0');
    var day = (date.getDate() + '').padStart(2, '0');
    return date.getFullYear() + "-" + month + "-" + day;
};
var templateObject_1;
//# sourceMappingURL=emailSlice.js.map