import { createAction, createSlice } from '@reduxjs/toolkit';
var initialState = {
    wordCloudLoading: false,
    wordCloud: undefined,
};
// Actions
export var setWordCloudLoading = createAction('wordCloud/setWordCloudLoading');
export var setWordCloud = createAction('wordCloud/setWordCloud');
// Reducer
export var wordCloudSlice = createSlice({
    name: 'wordCloud',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(setWordCloudLoading, function (state, action) {
            state.wordCloudLoading = action.payload;
        })
            .addCase(setWordCloud, function (state, action) {
            state.wordCloud = action.payload;
        });
    },
});
export default wordCloudSlice.reducer;
// selectors & getters
export var getWordCloudLoading = function (state) {
    return state.wordCloud.wordCloudLoading;
};
export var getWordCloud = function (state) { return state.wordCloud.wordCloud; };
//# sourceMappingURL=wordCloudSlice.js.map