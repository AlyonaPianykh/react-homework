import { SORT_BY, CREATE_POST } from '../action-types';

export const sortBy = (sortType) => ({ type: SORT_BY, payload: sortType });

export const createPost = (post) => ({type: CREATE_POST, payload: post});