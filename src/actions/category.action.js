import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

const getAllCategory = () => {
  return async (dispatch) => {
    // Before starting Check
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

    const res = await axios.get(`category/getcategory`);
    console.log(res);
    // if status == 200 or Success
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    }
    // else if not equal
    else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQUEST });
    try {
      const res = await axios.post(`/category/create`, form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }

    // console.log(res);
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
    const res = await axios.post(`/category/update`, form);
    if (res.status === 201) {
      dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS });
      dispatch(getAllCategory());
    } else {
      const { error } = res;
      dispatch({
        type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
        payload: { error },
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });
    const res = await axios.post(`/category/delete`, {
      payload: {
        ids,
      },
    });
    if (res.status === 200) {
      dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS });
      dispatch(getAllCategory());
    } else {
      const { error } = res;
      dispatch({
        type: categoryConstants.DELETE_CATEGORIES_FAILURE,
        payload: { error },
      });
    }
  };
};

export { getAllCategory };
