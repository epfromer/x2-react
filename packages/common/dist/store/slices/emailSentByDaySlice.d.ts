import { RootState } from '..';
import { EmailSentByDay } from '../types';
export interface EmailSentByDayState {
    emailSentByDayLoading: boolean;
    emailSentByDay: Array<EmailSentByDay> | undefined;
}
export declare const setEmailSentByDayLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
export declare const setEmailSentByDay: import("@reduxjs/toolkit").ActionCreatorWithPayload<EmailSentByDay[], string>;
export declare const emailSentByDaySlice: import("@reduxjs/toolkit").Slice<EmailSentByDayState, {}, "emailSentByDay">;
declare const _default: import("redux").Reducer<EmailSentByDayState, import("redux").AnyAction>;
export default _default;
export declare const getEmailSentByDayLoading: (state: RootState) => boolean;
export declare const getEmailSentByDay: (state: RootState) => Array<EmailSentByDay> | undefined;
