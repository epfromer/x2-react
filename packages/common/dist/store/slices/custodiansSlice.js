var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { gql, request } from 'graphql-request';
import { x2Server } from '../../constants';
var initialState = {
    custodiansLoading: false,
    custodians: undefined,
};
// Actions
export var setCustodiansLoading = createAction('custodians/setCustodiansLoading');
export var setCustodians = createAction('custodians/setCustodians');
// Reducer
export var custodiansSlice = createSlice({
    name: 'custodians',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(setCustodiansLoading, function (state, action) {
            state.custodiansLoading = action.payload;
        })
            .addCase(setCustodians, function (state, action) {
            state.custodians = action.payload;
        });
    },
});
export default custodiansSlice.reducer;
// selectors & getters
export var getCustodiansLoading = function (state) {
    return state.custodians.custodiansLoading;
};
export var getCustodians = function (state) {
    return state.custodians.custodians;
};
export function getEmailSenders(state) {
    var custodians = state.custodians.custodians;
    var data = [];
    if (custodians) {
        custodians.forEach(function (custodian) {
            if (custodian.senderTotal) {
                data.push({
                    name: custodian.name,
                    value: custodian.senderTotal,
                    color: custodian.color,
                });
            }
        });
    }
    return data;
}
export function getEmailReceivers(state) {
    var custodians = state.custodians.custodians;
    var data = [];
    if (custodians) {
        custodians.forEach(function (custodian) {
            if (custodian.receiverTotal) {
                data.push({
                    name: custodian.name,
                    value: custodian.receiverTotal,
                    color: custodian.color,
                });
            }
        });
    }
    return data;
}
export function getEmailSentByCustodian(state) {
    var custodianNameFromId = function (id) {
        if (state.custodians && state.custodians.custodians) {
            var c = state.custodians.custodians.find(function (c) { return c.id === id; });
            return c ? c.name : '';
        }
        return '';
    };
    var custodians = state.custodians.custodians;
    var data = [];
    var nodes = [];
    if (custodians) {
        custodians.forEach(function (fromCustodian) {
            fromCustodian.toCustodians.forEach(function (toCustodian) {
                data.push({
                    source: fromCustodian.name,
                    target: custodianNameFromId(toCustodian.custodianId),
                    value: toCustodian.total,
                });
            });
        });
        // and array of color keys
        custodians.forEach(function (custodian) {
            nodes.push({ id: custodian.name, color: custodian.color });
        });
    }
    return { data: data, nodes: nodes };
}
export function getCustodiansAsync(store) {
    store.dispatch(setCustodiansLoading(true));
    var server = process.env.REACT_APP_X2_SERVER
        ? process.env.REACT_APP_X2_SERVER
        : x2Server;
    var query = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    {\n      getCustodians {\n        id\n        name\n        title\n        color\n        senderTotal\n        receiverTotal\n        toCustodians {\n          custodianId\n          total\n        }\n      }\n    }\n  "], ["\n    {\n      getCustodians {\n        id\n        name\n        title\n        color\n        senderTotal\n        receiverTotal\n        toCustodians {\n          custodianId\n          total\n        }\n      }\n    }\n  "])));
    request(server + "/graphql/", query)
        .then(function (data) {
        store.dispatch(setCustodians(data.getCustodians));
        store.dispatch(setCustodiansLoading(false));
    })
        .catch(function (e) { return console.error(e); });
}
var templateObject_1;
//# sourceMappingURL=custodiansSlice.js.map