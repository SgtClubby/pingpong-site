import { atom } from 'recoil';

export const stateAtom = atom({
    key: 'selected',
    default: "Home",
});