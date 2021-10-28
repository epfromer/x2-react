// TODO https://github.com/react-native-async-storage/async-storage/issues/574
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
// import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
import { clearSearch, getAllText, getBody, getCustodiansAsync, getEmailAsync, getEmailById, getEmailIndex, getEmailListPage, getEmailReceivers, getEmailSenders, getEmailSentByCustodian, getFrom, getInitialDataAsync, getNextEmailId, getOrder, getPreviousEmailId, getSent, getSort, getSubject, getTo, loadAppSettingsAsync, setAllText, setBody, setCustodians, setEmail, setEmailSentByDay, setFrom, setSubject, setTo, setWordCloud, store, testCustodians, testEmail, testEmailSentByDay, testWordCloud, } from '../index';
// jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)
store.dispatch(setWordCloud(testWordCloud));
store.dispatch(setCustodians(testCustodians));
store.dispatch(setEmailSentByDay(testEmailSentByDay));
store.dispatch(setEmail(testEmail));
store.dispatch(setAllText('body'));
store.dispatch(setTo('body'));
store.dispatch(setFrom('body'));
store.dispatch(setSubject('body'));
store.dispatch(setBody('body'));
test('getEmailById', function () {
    expect(getEmailById(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')).toBeTruthy();
});
test('getNextEmailId', function () {
    expect(getNextEmailId(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')).toBeTruthy();
});
test('getPreviousEmailId', function () {
    expect(getPreviousEmailId(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')).toBeTruthy();
});
test('getEmailIndex', function () {
    expect(getEmailIndex(store, 'f3281cc4-90a9-4dcb-86bd-d705fc847985')).toBeTruthy();
});
test('getWordCloudAsync', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fetchMock.mockResponseOnce(JSON.stringify(testCustodians));
                return [4 /*yield*/, getCustodiansAsync(store)];
            case 1:
                _a.sent();
                expect(store.getState().custodians.custodians).toEqual(testCustodians);
                return [2 /*return*/];
        }
    });
}); });
test('loadAppSettingsAsync', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadAppSettingsAsync(store)];
            case 1:
                _a.sent();
                expect(store.getState().appSettings.darkMode).toEqual(false);
                return [2 /*return*/];
        }
    });
}); });
test('getEmailAsync', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fetchMock.mockResponseOnce(JSON.stringify(testEmail));
                return [4 /*yield*/, getEmailAsync(store)];
            case 1:
                _a.sent();
                expect(store.getState().email.email).toEqual(testEmail);
                return [2 /*return*/];
        }
    });
}); });
test('getEmailIndex', function () {
    store.dispatch(clearSearch());
    expect(getAllText(store.getState())).toEqual('');
    expect(getBody(store.getState())).toEqual('');
    expect(getEmailListPage(store.getState())).toEqual(0);
    expect(getFrom(store.getState())).toEqual('');
    expect(getOrder(store.getState())).toEqual(1);
    expect(getSort(store.getState())).toEqual('sent');
    expect(getSent(store.getState())).toEqual('');
    expect(getSubject(store.getState())).toEqual('');
    expect(getTo(store.getState())).toEqual('');
});
test('getEmailSenders', function () {
    expect(getEmailSenders(store.getState())).toBeTruthy();
});
test('getEmailReceivers', function () {
    expect(getEmailReceivers(store.getState())).toBeTruthy();
});
test('getEmailSentByCustodian', function () {
    expect(getEmailSentByCustodian(store.getState())).toBeTruthy();
});
test('initial data', function () {
    getInitialDataAsync(store);
});
//# sourceMappingURL=store.spec.js.map