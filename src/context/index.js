import {createContext} from 'react';
import {sortingTypes} from '../constants';

export const SortingContext = createContext({
    sortType: sortingTypes.BY_AUTHOR,
});

export const ThemeContext = createContext('dark');
export const AppConfigContext = createContext({});
export const UserContext = createContext({});



