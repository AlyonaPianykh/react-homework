import React, {Component, createRef} from 'react';
import uniqId from 'uniqid';
import {Button} from '../Button/Button';
import ImgWarning from './../../assets/icon-attention-png-clip-art.png'
import './AddUserForm.scss';

const CN = 'user-form';

class AddUserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentError: '',
            inputErrorName: '',
            inputErrorLastName: '',
            errorInputName: '',
            errorInputLastName: ''
        };
    }

    // todo: добавить state, в него добавить пропертю, которая будет отображать есть ли ошибка или нет.
    //  допустим это будет строка currentError
    //  по умолчанию она будет пустой
    //  если произошла ошибка - в эту пропертю запишется строка, какая именно ошибка произошла

    userNameRef = createRef();
    userLastNameRef = createRef();

    onInputChange = (e) => {

        // if (e.target.value) {
        //     this.setState({
        //         currentError: ''
        //     })
        //     console.log('target')
        // }

        if (this.userNameRef.current.value.trim()) {
            this.setState({
                inputErrorName: '',
                errorInputName: '',
                currentError: ''

            });
            console.log('userNameRef')
        }

        if (this.userLastNameRef.current.value.trim()) {
            this.setState({
                inputErrorLastName: '',
                errorInputLastName: '',
                currentError: ''

            });
            console.log('userLastNameRef')
        }

        // todo: если в стейте была записана какая-то ошибка - зачищаем ее при изменении инпута
        //  поскольку в ситуации если пользователь ничего - не ввел - увидел ошибку - понял, что не так - начал вводить данные
        //  было бы хорошо не пугать его висящим сообщением, что все таки что-то не так
    };

    onSubmit = (e) => {
        e.preventDefault();

        const userNameValue = this.userNameRef.current.value;
        const userLastNameValue = this.userLastNameRef.current.value;

        if (userNameValue.trim() === '' && userLastNameValue.trim() === '') {
            this.setState({
                currentError: 'WARNING!!! WRITE SOMETHING!!!'

            });
        }

        if (!userNameValue.trim()) {

            this.setState({
                inputErrorName: 'second-form-control',
                errorInputName: 'This input is empty! Write something!'
            })
        }

        if (!userLastNameValue.trim()) {

            this.setState({
                inputErrorLastName: 'second-form-control',
                errorInputLastName: 'This input is empty! Write something!'
            })
        }

        // Todo: добавить здесь проверку, если пользователь НЕ ВВЕЛ в инпуты ничего - не создаем пост
        //  и обновляем currentError в стейте, кладем сообщение, что пошло не так
        //  если пользователь ввел данные - создаем постзадачу

        const {addUser} = this.props;

        const user = {
            name: userNameValue,
            lastName: userLastNameValue,
            id: uniqId()
        };

        addUser(user);

        this.onReset()
    };

    onReset = () => {
        this.userNameRef.current.value = "";
        this.userLastNameRef.current.value = "";
        // todo: имплементнуть функцию скидывания значений, введеных пользователем
    };

    // onAlternativeSubmit = (event) => {
    //     event.preventDefault();
    //     const {addUser} = this.props;
    //
    //     const formData = new FormData(event.target);
    //     debugger
    //     const user = {
    //         name: formData.get('userName'),
    //         lastName: formData.get('userLastName'),
    //         id: uniqId()
    //     };
    //     addUser(user);
    //
    //     console.log(user)
    // };

    render() {
        console.log(this.userNameRef)
        const {currentError} = this.state;

        return (
            <form className={CN} onSubmit={this.onSubmit}>
                <h2>Create new User</h2>
                <div className="form-group">
                    <label htmlFor="title" className="input-group-text">Enter user name:</label>
                    <input
                        ref={this.userNameRef}
                        className={`form-control ${this.state.inputErrorName}`}
                        type="text"
                        name="userName"
                        onChange={this.onInputChange}
                    />
                    <div className="errorInputs">
                        {this.state.errorInputName}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="input-group-text">Enter user last name:</label>
                    <input
                        ref={this.userLastNameRef}
                        className={`form-control ${this.state.inputErrorLastName}`}
                        type="text"
                        name="userLastName"
                        onChange={this.onInputChange}
                    />
                    <div className="errorInputs">
                        {this.state.errorInputLastName}
                    </div>
                </div>

                {!!currentError && (
                    <div className='warning'>
                        <div>
                            <h2>{currentError}</h2>
                            <img src={ImgWarning} alt="Warning"/>
                        </div>
                    </div>)
                }

                {/* todo: Добавить здесь <div> сообщение об ошибке, если такая произошла */}
                {/* todo: стилизуйте это сообщение об ошибке, чтоб текст был красным и броским */}
                {/* todo: можете добавить иконку с восклицательным знаком, чтоб привлечь внимание пользователя */}
                {/* todo: под ошибкой имеется ввиду, что пользователь не ввел данные в инпуты и нажал submit */}
                <Button type="submit"
                        className="btn-outline-secondary"
                        label="Add post"
                />

                <Button className="btn-outline-secondary"
                        label="Reset"
                        onClick={this.onReset}
                />
                {/* ToDo: добавить кнопку для скидывания введеных пользователем значений */}
                {/* ToDo: на кнопке должно быть написано Reset */}
                {/* ToDo: в onClick кнопки прокинуть метод класса onReset (объявлен в строке 51) */}

            </form>
        );
    }
}

export default AddUserForm;
