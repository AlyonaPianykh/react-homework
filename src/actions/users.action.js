import { batch } from 'react-redux'
import {
  GET_USERS,
  GET_USERS_ERROR,
  LOADING_USERS_END,
  LOADING_USERS_START,
} from '../action-types';

const getUsersSuccess = (users) => ({ type: GET_USERS, payload: users });
const getUsersError = (error) => ({ type: GET_USERS_ERROR, payload: error });
const startLoading = () => ({ type: LOADING_USERS_START });
const endLoading = () => ({ type: LOADING_USERS_END });

export function getUsers(page, perPage) {
  // todo перенесена сюда функция создания url, теперь функция принимает параметры номер страницы и количество объектов на странице
  const url = `https://reqres.in/api/users?page=${page}&per_page=${perPage}`;
  return (dispatch) => {
    const usersListObjectString = localStorage.getItem('usersList');

    if (usersListObjectString) {
      let usersListObject = {};
      try {
        usersListObject = JSON.parse(usersListObjectString);
      } catch (e) {
        console.log('error in parsing json');
      }
      const {usersList: usersListObj, date} = usersListObject

      // todo обратите внимание здесь добавлена проверка отличаются ли параметры которые прилетели как аргументы
      //     от тех, что лежат в localStorage
      //     + это приведение к типу число
      if (+page === usersListObj.page && +perPage === usersListObj.perPage && date) {
        const date1 = new Date();
        const date2 = new Date(date);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / 1000);
        console.log('diffDays', diffDays);

        const { usersList } = usersListObj;
        if (diffDays < 30 && usersList && usersList.length) {
           return dispatch(getUsersSuccess(usersListObj)); // выход из функции
        }
      }
    }

    debugger
    dispatch(startLoading());
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then(({ data, total_pages, page, total, per_page }) => {

        batch(() => {
          dispatch(endLoading());
          dispatch(getUsersSuccess({
            usersList: data,
            totalPages: total_pages,
            page,
            totalResult: total,
            perPage: per_page
          }));
        })
      })
      .catch((error) => {
        batch(() => {
          dispatch(endLoading());
          dispatch(getUsersError(error))
        })
      });
  };
}