import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../types/types";

const initialState = {
    isAuthenticated: false,
    token: "",
    user: "",
    error: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                error: "",
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: "",
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
