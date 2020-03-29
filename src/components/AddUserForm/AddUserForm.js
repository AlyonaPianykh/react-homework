import React, {Component, createRef} from 'react';
import uniqId from 'uniqid';
import {Button} from '../Button/Button';
import ImgWarning from './../../assets/warning2.png'
import './AddUserForm.scss';

const CN = 'user-form';

class AddUserForm extends Component {
    constructor(props) {
        super(props);
        // this.userNameRef = createRef(); // аналогично записи в строке 19
        // this.userLastNameRef = createRef();
        this.state = {
            currentError: '',
            errorUserName: '',
            errorUserLastName: '',
            userName: '',
            userLastName: '',
        };
    }

    // todo: добавить state, в него добавить пропертю, которая будет отображать есть ли ошибка или нет.
    //  допустим это будет строка currentError
    //  по умолчанию она будет пустой
    //  если произошла ошибка - в эту пропертю запишется строка, какая именно ошибка произошла

    userNameRef = createRef();
    userLastNameRef = createRef();

    onInputChange = (e) => {
        console.log(e.target.value);
        // todo: если в стейте была записана какая-то ошибка - зачищаем ее при изменении инпута
        //  поскольку в ситуации если пользователь ничего - не ввел - увидел ошибку - понял, что не так - начал вводить данные
        //  было бы хорошо не пугать его висящим сообщением, что все таки что-то не так
        this.state.currentError && this.setState({
            currentError: '',
            // errorUserName: '',
            // errorUserLastName: ''
        });
        if (this.userNameRef.current.value !== '') {
            this.setState({
                errorUserName: '',
                userName: this.userNameRef.current.value
            });
            console.log(this.state.userName)
        }
        if (this.userLastNameRef.current.value !== '') {
            this.setState({
                errorUserLastName: '',
                userLastName: this.userLastNameRef.current.value
            })
        }

    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.userNameRef.current.value === '' || this.userLastNameRef.current.value === '') {
            this.setState({
                currentError: "Please input information",
                errorUserName: this.userNameRef.current.value === '' ? "INPUT NAME" : '',
                errorUserLastName: this.userLastNameRef.current.value === '' ? "INPUT LASTNAME" : ''
            })
        } else {
            // Todo: добавить здесь проверку, если пользователь НЕ ВВЕЛ в инпуты ничего - не создаем пост
            //  и обновляем currentError в стейте, кладем сообщение, что пошло не так
            //  если пользователь ввел данные - создаем постзадачу

            const {addUser} = this.props;

            const user = {
                name: this.userNameRef.current.value,
                lastName: this.userLastNameRef.current.value,
                id: uniqId()
            };

            addUser(user);

            this.onReset();

            // this.userNameRef.current.value = "";
            // this.userLastNameRef.current.value = "";
        }
    };

    onReset = () => {
        this.userNameRef.current.value = "";
        this.userLastNameRef.current.value = "";
        this.setState({
            userName: '',
            userLastName: ''
        })
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
        return (
            <form className={CN} onSubmit={this.onSubmit}>
                <h2>Create new User</h2>
                <div className="form-group">
                    <label htmlFor="title" className="input-group-text">Enter post title:</label>
                    <input
                        ref={this.userNameRef}
                        className={`form-control ${this.state.errorUserName ? "error-input" : ""}`}
                        type="text"
                        name="userName"
                        onChange={this.onInputChange}
                    />
                    {/*<div className={'error'}> {this.userNameRef.current ? this.state.errorUserName : ""}</div>*/}
                    {!!this.state.errorUserName && <div className={'error'}> {this.state.errorUserName}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="text" className="input-group-text">Enter post text:</label>
                    <input
                        ref={this.userLastNameRef}
                        className={`form-control ${this.state.errorUserLastName ? "error-input" : ""}`}
                        type="text"
                        name="userLastName"
                        onChange={this.onInputChange}
                    />
                    {/*<div className={'error'}> {this.userLastNameRef.current ? this.state.errorUserLastName : ""}</div>*/}
                    {!!this.state.errorUserLastName && <div className={'error'}> {this.state.errorUserLastName}</div>}
                </div>

                {/*<div className={'error h3'}>*/}
                {/*    {this.state.currentError ? <img className={'img-warning'} src={ImgWarning} alt=""/> : ""}*/}
                {/*    <br/>*/}
                {/*    {this.state.currentError}*/}
                {/*</div>*/}

                {
                    !!this.state.currentError && (
                        <div className={'error h3'}>
                            <img className={'img-warning'} src={ImgWarning} alt=""/>
                            <br/>
                            {this.state.currentError}
                        </div>
                    )
                }

                {/* todo: Добавить здесь <div> сообщение об ошибке, если такая произошла */}
                {/* todo: стилизуйте это сообщение об ошибке, чтоб текст был красным и броским */}
                {/* todo: можете добавить иконку с восклицательным знаком, чтоб привлечь внимание пользователя */}
                {/* todo: под ошибкой имеется ввиду, что пользователь не ввел данные в инпуты и нажал submit */}
                <Button isDisabled={!this.state.userName && !this.state.userLastName}
                        type="submit" className="btn-outline-secondary" label="Add post"/>


                {/* ToDo: добавить кнопку для скидывания введеных пользователем значений */}
                {/* ToDo: на кнопке должно быть написано Reset */}
                {/* ToDo: в onClick кнопки прокинуть метод класса onReset (объявлен в строке 51) */}
                <Button isDisabled={!this.state.userName && !this.state.userLastName}
                        onClick={this.onReset}
                        className="btn-outline-secondary"
                        label="Reset"/>

            </form>
        );
    }
}

export default AddUserForm;
