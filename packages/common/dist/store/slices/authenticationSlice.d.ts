import { Store } from '@reduxjs/toolkit';
export interface AuthenticationState {
    authenticated: boolean;
    username: string;
}
export declare const setAuthenticated: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
export declare const setUsername: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
export declare const authenticationSlice: import("@reduxjs/toolkit").Slice<AuthenticationState, {}, "authentication">;
declare const _default: import("redux").Reducer<AuthenticationState, import("redux").AnyAction>;
export default _default;
export declare const getAuthenticated: (state: {
    authentication: {
        authenticated: boolean;
    };
}) => boolean;
export declare const getUsername: (state: {
    authentication: {
        username: string;
    };
}) => string;
export declare function signOut(store: Store): void;
