import { Store } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Email } from '../types';
export interface EmailState {
    emailLoading: boolean;
    email: Array<Email> | undefined;
    emailTotal: number;
}
export declare const setEmailLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
export declare const setEmail: import("@reduxjs/toolkit").ActionCreatorWithPayload<Email[], string>;
export declare const appendEmail: import("@reduxjs/toolkit").ActionCreatorWithPayload<Email[], string>;
export declare const setEmailTotal: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, string>;
export declare const emailSlice: import("@reduxjs/toolkit").Slice<EmailState, {}, "email">;
declare const _default: import("redux").Reducer<EmailState, import("redux").AnyAction>;
export default _default;
export declare const getEmailLoading: (state: RootState) => boolean;
export declare const getEmail: (state: RootState) => Array<Email> | undefined;
export declare const getEmailTotal: (state: RootState) => number;
export declare function getEmailAsync(store: Store, append?: boolean): void;
export declare const getEmailById: (store: Store, id: string) => Email | undefined;
export declare const getNextEmailId: (store: Store, id: string) => string | undefined;
export declare const getPreviousEmailId: (store: Store, id: string) => string | undefined;
export declare const getEmailIndex: (store: Store, id: string) => number | undefined;
export declare const getDateStr: (date: Date) => string;
