import React from 'react';
import {BtnMenu} from "../BtnMenu/BtnMenu";
import {sortingTypes} from "../../constants";
import {SortingContext} from "../../context";
import {Button} from "../Button/Button";
// Task 1
//    todo: создать здесь функциональную компоненту SortingOptionsPanel +
//     она должна возвращать JSX из файла App.js строки 74-92 +
//     сделать импорт константы sortingTypes +
//     сделать импорт компоненты BtnMenu +
//     сделать импорт SortingContext +
//     обвернуть возвращаемый JSX в SortingContext.Consumer таким образом что будут доступны данные из контекста +
//     const { sortType, onSortingChange, posts, addPost } = sortConfig; по аналогии с App.js строка 59 +
//     перенести функцию renderButton в эту компоненту +

// Task 3
//   todo: достать из SortingContext переменную sortType и передать ее как props под названием selectedSortType в компоненту BtnMenu

export const SortingOptionsPanel = () => {

    const renderButton = (label, sortType, onClick, sortCondition) => {
        return (
            <Button
                className={`btn-outline-primary ${sortType === sortCondition ? 'btn-styled' : ''}`}
                label={label}
                onClick={() => {
                    onClick(sortCondition);
                }}
            />
        );
    };

    return (
        <SortingContext.Consumer>
            {sortConfig => {
                const {sortType, onSortingChange, posts, addPost} = sortConfig;
                return (
                    <div className="sorting-options d-flex justify-items-center align-items-center">
                        <label className="custom-label">Sorting options:</label>
                        <BtnMenu
                            options={Object.keys(sortingTypes)}
                            onSortingChange={onSortingChange}
                            selectedSortType={sortType}
                        />
                        {renderButton(
                            'Sort by author',
                            sortType,
                            onSortingChange,
                            sortingTypes.BY_AUTHOR
                        )}
                        {renderButton(
                            'Sort by date',
                            sortType,
                            onSortingChange,
                            sortingTypes.BY_DATE
                        )}
                    </div>
                )
            }}
        </SortingContext.Consumer>
    );
};