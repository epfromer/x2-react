var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import request, { gql } from 'graphql-request';
import { defaultThemeName, x2Server } from '../../constants';
import { setCustodians, setCustodiansLoading } from './custodiansSlice';
import { setEmailSentByDay, setEmailSentByDayLoading, } from './emailSentByDaySlice';
import { setWordCloud, setWordCloudLoading } from './wordCloudSlice';
var initialState = {
    darkMode: false,
    orientation: 'portrait',
    themeName: defaultThemeName,
};
// Actions
export var setDarkMode = createAction('appSettings/setDarkMode');
export var setThemeName = createAction('appSettings/setThemeName');
// Reducer
export var appSettingsSlice = createSlice({
    name: 'appSettings',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(setDarkMode, function (state, action) {
            state.darkMode = action.payload;
        })
            .addCase(setThemeName, function (state, action) {
            state.themeName = action.payload;
        });
    },
});
export default appSettingsSlice.reducer;
// selectors & getters
export var getDarkMode = function (state) {
    return state.appSettings.darkMode;
};
export var getThemeName = function (state) {
    return state.appSettings.themeName;
};
export function loadAppSettingsAsync(store) {
    return __awaiter(this, void 0, void 0, function () {
        var darkMode, themeName, value, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    darkMode = false;
                    themeName = defaultThemeName;
                    if (!(typeof Storage !== 'undefined')) return [3 /*break*/, 1];
                    if (localStorage.getItem('darkMode') &&
                        localStorage.getItem('darkMode') === 'true') {
                        darkMode = true;
                    }
                    if (localStorage.getItem('themeName') &&
                        localStorage.getItem('themeName') !== 'null') {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        themeName = localStorage.getItem('themeName');
                    }
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, AsyncStorage.getItem('darkMode')];
                case 2:
                    value = _a.sent();
                    if (value === 'true')
                        darkMode = true;
                    return [4 /*yield*/, AsyncStorage.getItem('themeName')];
                case 3:
                    value = _a.sent();
                    if (value)
                        themeName = value;
                    _a.label = 4;
                case 4:
                    store.dispatch(setDarkMode(darkMode));
                    store.dispatch(setThemeName(themeName));
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function setDarkModeAsync(store, darkMode) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof Storage !== 'undefined')) return [3 /*break*/, 1];
                    localStorage.setItem('darkMode', String(darkMode));
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, AsyncStorage.setItem('darkMode', String(darkMode))];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    store.dispatch(setDarkMode(darkMode));
                    return [2 /*return*/];
            }
        });
    });
}
export function setThemeNameAsync(store, themeName) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof Storage !== 'undefined')) return [3 /*break*/, 1];
                    localStorage.setItem('themeName', themeName);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, AsyncStorage.setItem('themeName', themeName)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    store.dispatch(setThemeName(themeName));
                    return [2 /*return*/];
            }
        });
    });
}
// const sleep = (ms = 0) => new Promise((r) => setTimeout(r, ms))
// graphQl query
export function getInitialDataAsync(store) {
    var _this = this;
    store.dispatch(setWordCloudLoading(true));
    store.dispatch(setEmailSentByDayLoading(true));
    store.dispatch(setCustodiansLoading(true));
    var server = process.env.REACT_APP_X2_SERVER
        ? process.env.REACT_APP_X2_SERVER
        : x2Server;
    var query = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    {\n      getWordCloud {\n        tag\n        weight\n      }\n      getEmailSentByDay {\n        sent\n        total\n      }\n      getCustodians {\n        id\n        name\n        title\n        color\n        senderTotal\n        receiverTotal\n        toCustodians {\n          custodianId\n          total\n        }\n      }\n    }\n  "], ["\n    {\n      getWordCloud {\n        tag\n        weight\n      }\n      getEmailSentByDay {\n        sent\n        total\n      }\n      getCustodians {\n        id\n        name\n        title\n        color\n        senderTotal\n        receiverTotal\n        toCustodians {\n          custodianId\n          total\n        }\n      }\n    }\n  "])));
    request(server + "/graphql/", query)
        .then(function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // await sleep(5000)
            store.dispatch(setWordCloud(data.getWordCloud));
            store.dispatch(setEmailSentByDay(data.getEmailSentByDay));
            store.dispatch(setCustodians(data.getCustodians));
            store.dispatch(setWordCloudLoading(false));
            store.dispatch(setEmailSentByDayLoading(false));
            store.dispatch(setCustodiansLoading(false));
            return [2 /*return*/];
        });
    }); })
        .catch(function (e) { return console.error(e); });
}
var templateObject_1;
//# sourceMappingURL=appSettingsSlice.js.map