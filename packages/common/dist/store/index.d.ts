import { Action, ThunkAction } from '@reduxjs/toolkit';
export * from './slices/appSettingsSlice';
export * from './slices/authenticationSlice';
export * from './slices/custodiansSlice';
export * from './slices/emailSentByDaySlice';
export * from './slices/emailSlice';
export * from './slices/querySlice';
export * from './slices/wordCloudSlice';
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    appSettings: import("./slices/appSettingsSlice").AppSettingsState;
    authentication: import("./slices/authenticationSlice").AuthenticationState;
    custodians: import("./slices/custodiansSlice").CustodiansState;
    email: import("./slices/emailSlice").EmailState;
    emailSentByDay: import("./slices/emailSentByDaySlice").EmailSentByDayState;
    query: import("./slices/querySlice").QueryState;
    wordCloud: import("./slices/wordCloudSlice").WordCloudState;
}, import("redux").AnyAction, import("redux").Middleware<{}, any, import("redux").Dispatch<import("redux").AnyAction>>[]>;
