import cloneDeep from 'lodash/cloneDeep';
import { allPosts, sortingTypes } from '../constants';

// todo импортнуть ниже ваш новы тип экшена CREATE_POST
import { SORT_BY, CREATE_POST } from '../action-types';

const initialState = {
  sortType: sortingTypes.BY_DEFAULT,
  posts: allPosts
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY: {
      const { payload: sortType } = action;
      let newArray = [];
      const copy = cloneDeep(state.posts);
      
      switch (sortType) {
        case sortingTypes.BY_DATE:
          newArray = sortByDate(copy);
          break;
        case sortingTypes.BY_AUTHOR:
          newArray = sortByAuthor(copy);
          break;
        default:
          newArray = initialState.posts;
          break;
      }

      return {
        sortType,
        posts: newArray
      };
    }
    // todo раскоментировать и имплементнуть редюсер к этому экшн типу
    //    нужно копировать state.posts и добавить к копии новый элемент, который лежит в action.payload
    //    вернуть копию стейта с подмененным массивом posts
    case CREATE_POST: {
      const newPost = action.payload;
      return {...state, posts: [...state.posts, newPost]}
    }
    default:
      return state;
  }
};

const sortByAuthor = (array) => {
 return array.sort(function (a, b) {
    if (a.authorName > b.authorName) {
      return 1;
    }
    if (a.authorName < b.authorName) {
      return -1;
    }
    return 0;
  });
};

const sortByDate = (array) => {
  return array.sort((a, b) => new Date(a.data) - new Date(b.data));
};