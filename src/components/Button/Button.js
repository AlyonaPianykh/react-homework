import React from "react";
import "./Button.scss";

const CN = "my-btn";
export const Button = props => {
    const {
        id,
        type = "button", // дефолтное значение = 'button'
        onClick,
        label = "Click me", // дефолтное значение = "Click me"
        className = "btn-primary",
        // todo добавить пропсу isDisabled, значение которой по умолчанию должно быть false
        isDisabled = false,
        title = '',
        dataToggle = '',
        dataPlacement = ''

    } = props;

    const onClickHandler = e => {
        onClick && onClick(e); // такая конструкция нужна, чтоб, если onClick в пропсах не прийдет, тут не выпала ошибка
    };


    // todo в строке 23 если значение isDisabled равно true добавить класс "disabled"
    //   после 26 строки добавить кнопке атрибут disabled который равен значению пропсы isDisabled
    return (
        <button
            className={`${CN} btn add-margin ${className} ${isDisabled && 'disabled'} ${title.trim() && 'toolt'}`}
            id={id}
            onClick={onClickHandler}
            disabled={isDisabled}
            type={type}
            title={title}
        >
            {label}
        </button>
    );
};
