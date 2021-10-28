import { configureStore, createSerializableStateInvariantMiddleware, } from '@reduxjs/toolkit';
// import logger from 'redux-logger'
import appSettingsReducer from './slices/appSettingsSlice';
import authenticationReducer from './slices/authenticationSlice';
import custodiansReducer from './slices/custodiansSlice';
import emailSentByDayReducer from './slices/emailSentByDaySlice';
import emailReducer from './slices/emailSlice';
import queryReducer from './slices/querySlice';
import wordCloudReducer from './slices/wordCloudSlice';
export * from './slices/appSettingsSlice';
export * from './slices/authenticationSlice';
export * from './slices/custodiansSlice';
export * from './slices/emailSentByDaySlice';
export * from './slices/emailSlice';
export * from './slices/querySlice';
export * from './slices/wordCloudSlice';
// const middleware = [...getDefaultMiddleware(), logger]
var serializableMiddleware = createSerializableStateInvariantMiddleware({
    warnAfter: 200,
});
export var store = configureStore({
    reducer: {
        appSettings: appSettingsReducer,
        authentication: authenticationReducer,
        custodians: custodiansReducer,
        email: emailReducer,
        emailSentByDay: emailSentByDayReducer,
        query: queryReducer,
        wordCloud: wordCloudReducer,
    },
    middleware: [serializableMiddleware],
});
//# sourceMappingURL=index.js.map