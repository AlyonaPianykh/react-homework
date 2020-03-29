import React, { useState } from "react";
import { Button } from '../Button/Button';
import { sortingTitle } from "../../constants";
import './BtnMenu.scss';

const CN = 'btn-menu'; // todo: Обратите внимание, это главный оберточный класс для этой компоненты

export const BtnMenu = props => {
  // Task 3
//   todo: достать из props пропертю selectedSortType которая прилетит из SortingOptionsPanel
  const { options, onSortingChange, selectedSortType } = props;
  const [isOpenChange, setIsOpenChange] = useState(false);


  const onLabelClick = e => {
    onSortingChange(e.target.id);
    toggleMenu(); // close menu after selection
  };

  const toggleMenu = () => {
    setIsOpenChange(!isOpenChange);
  };

  return (
    <div className={CN}>
      <Button className="buttonMenu custom-select" onClick={toggleMenu} label="sort"/>
      <ul className="change-menu list-group">
        {isOpenChange && !!options.length && options.map(item => {
          // todo: добавить класс active если item равно выбраному в текущий момент виду сортировки (selectedSortType)
            return (
              <li key={item} id={item} className={`list-group-item ${selectedSortType === item && 'active'}`} onClick={onLabelClick}>
                {sortingTitle[item]}
              </li>
            );
          })}

        { // menu is empty
          isOpenChange && !options.length && (
            <li className="list-group-item">
              No Options To Display
            </li>
          )
        }
      </ul>
    </div>
  );
};
