import create from 'zustand';

export type ErrorMsgStore = {
  msg: string;
};

export const useErrorMsg = create<ErrorMsgStore>((set, get) => ({
  msg: '',
}));
