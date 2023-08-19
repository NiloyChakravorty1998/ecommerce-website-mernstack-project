import { selector } from "recoil";
import { currentUserState } from "../atoms/userAtom";

export const userInfoSelector = selector({
    key: 'userInfoSelector',
    get: ({ get }) => {
        const user = get(currentUserState); 
        return user;
    },
});