import {User} from "./screens/project-list/search-panel";
import {AuthForm} from "./context/auth-context";

const localStorageKey = '__auth_provider_token__';
const appUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({user}: {user: User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user;
}

export const login = (data: AuthForm) => {
    return fetch(`${appUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async res => {
        if(res.ok) {
           return handleUserResponse(await res.json());
        }
        if(res.status === 400) {
            return Promise.reject({status: res.status, message: (await res.json())?.message || ''})
        }
        return Promise.reject(data);
    })
}

export const register = (data: AuthForm) => {
    return fetch(`${appUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        async res => {
            if(res.ok) {
                return handleUserResponse(await res.json());
            }
            if(res.status === 400) {
                return Promise.reject({status: res.status, message: (await res.json())?.message || ''})
            }
            return Promise.reject(data);
        }
    )
}

export const logout = async () => window.localStorage.removeItem(localStorageKey);
