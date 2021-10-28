import { RootState } from '..';
import { WordCloudTag } from '../types';
export interface WordCloudState {
    wordCloudLoading: boolean;
    wordCloud: Array<WordCloudTag> | undefined;
}
export declare const setWordCloudLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
export declare const setWordCloud: import("@reduxjs/toolkit").ActionCreatorWithPayload<WordCloudTag[], string>;
export declare const wordCloudSlice: import("@reduxjs/toolkit").Slice<WordCloudState, {}, "wordCloud">;
declare const _default: import("redux").Reducer<WordCloudState, import("redux").AnyAction>;
export default _default;
export declare const getWordCloudLoading: (state: RootState) => boolean;
export declare const getWordCloud: (state: RootState) => Array<WordCloudTag> | undefined;
