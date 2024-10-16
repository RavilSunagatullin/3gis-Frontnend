import {create} from 'zustand'
import {string} from "prop-types";

interface StoreState {
    isAuth: boolean,
    user: {
        username: string,
        password: string,
    }
    token: string,
    setToken: (token: string) => void
    setUser: (user: { username: string; password: string }) => void;
    setAuth: (isAuth: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
    isAuth: false,
    user: {
        username: '',
        password: '',
    },
    token: '',
    setToken: (token) => {
        set({token})
    },
    setUser: (user) => set({user}),
    setAuth: (isAuth) => set({isAuth}),
}))
export default useStore
