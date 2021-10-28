import { Store } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Custodian, EmailXferedDatum } from '../types';
export interface CustodiansState {
    custodiansLoading: boolean;
    custodians: Array<Custodian> | undefined;
}
export declare const setCustodiansLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, string>;
export declare const setCustodians: import("@reduxjs/toolkit").ActionCreatorWithPayload<Custodian[], string>;
export declare const custodiansSlice: import("@reduxjs/toolkit").Slice<CustodiansState, {}, "custodians">;
declare const _default: import("redux").Reducer<CustodiansState, import("redux").AnyAction>;
export default _default;
export declare const getCustodiansLoading: (state: RootState) => boolean;
export declare const getCustodians: (state: RootState) => Array<Custodian> | undefined;
export declare function getEmailSenders(state: RootState): Array<EmailXferedDatum>;
export declare function getEmailReceivers(state: RootState): Array<EmailXferedDatum>;
interface IDColorKey {
    id: string;
    color: string;
}
export interface EmailSent {
    source: string;
    target: string;
    value: number;
}
export interface EmailSentByCustodian {
    data: Array<EmailSent>;
    nodes: Array<IDColorKey>;
}
export declare function getEmailSentByCustodian(state: RootState): EmailSentByCustodian;
export declare function getCustodiansAsync(store: Store): void;
