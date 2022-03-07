import * as actionTypes from "../actiontypes/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
};
export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case actionTypes.REGISTER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload, //or token: payload.token
        isAuthenticated: true,
        isLoading: false,
      };

    case actionTypes.REGISTER_FAIL:
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const alertReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_ALERT:
      return [...state, { payload }];

    case actionTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.payload.id !== payload.id);

    default:
      return state;
  }
};

const initState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {},
};
export const profileReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_PROFILE:
    case actionTypes.ADD_EXP:
    case actionTypes.ADD_EDU:
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case actionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        isLoading: false,
      };
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        isLoading: false,
      };

    default:
      return state;
  }
};

const initialPostState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export const postReducer = (state = initialPostState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case actionTypes.GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case actionTypes.ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case actionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case actionTypes.POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case actionTypes.REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
};
