import { Store } from '@reduxjs/toolkit';
import { RootState } from '..';
export interface AppSettingsState {
    darkMode: boolean;
    orientation: string;
    themeName: string;
}
export declare const setDarkMode: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
export declare const setThemeName: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, string>;
export declare const appSettingsSlice: import("@reduxjs/toolkit").Slice<AppSettingsState, {}, "appSettings">;
declare const _default: import("redux").Reducer<AppSettingsState, import("redux").AnyAction>;
export default _default;
export declare const getDarkMode: (state: RootState) => boolean;
export declare const getThemeName: (state: RootState) => string;
export declare function loadAppSettingsAsync(store: Store): Promise<void>;
export declare function setDarkModeAsync(store: Store, darkMode: boolean): Promise<void>;
export declare function setThemeNameAsync(store: Store, themeName: string): Promise<void>;
export declare function getInitialDataAsync(store: Store): void;
