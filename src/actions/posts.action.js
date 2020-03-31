import { SORT_BY, CREATE_POST } from '../action-types';


export const sortBy = (sortType) => ({ type: SORT_BY, payload: sortType });

// todo создать экшн createPost
//  который пример как аргумент post и вернет его в payload
//  тип должен быть CREATE_POST
export const createPost = (post) => ({type: CREATE_POST, payload: post});