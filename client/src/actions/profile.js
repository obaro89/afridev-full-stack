import axios from "axios";
import {
  PROFILE_ERROR,
  GET_PROFILE,
  GET_PROFILES,
  ADD_EXP,
  ADD_EDU,
  NO_REPOS,
  GET_REPOS,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
} from "./../actiontypes/types";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const response = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/profile", formData, config);
      dispatch(
        setAlert(edit ? "Profile updated" : "Profile created", "success")
      );
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      "/api/profile/experience",
      formData,
      config
    );
    dispatch(setAlert("Experience Added", "success"));
    dispatch({
      type: ADD_EXP,
      payload: response.data,
    });

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      "/api/profile/education",
      formData,
      config
    );
    dispatch(setAlert("Education Added", "success"));
    dispatch({
      type: ADD_EDU,
      payload: response.data,
    });

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete("api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS,
    });
  }
};
