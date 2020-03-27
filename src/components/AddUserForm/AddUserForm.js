import React, {Component, createRef} from 'react';
import uniqId from 'uniqid';
import {Button} from '../Button/Button';
import './AddUserForm.scss';
import imageAttention from '../../assets/icon-attention-png-clip-art.png'

const CN = 'user-form';
const EMN = {
  userName: 'Please, enter your name',
  userLastName: 'Please, enter your last name'
};

class AddUserForm extends Component {
  state = {
    currentError: '',
    inputErrors: {
      userName: false,
      userLastName: false,
    }
  };

  constructor(props) {
    super(props);
    // this.userNameRef = createRef(); // аналогично записи в строке 19
    // this.userLastNameRef = createRef();
  }

  // todo: добавить state, в него добавить пропертю, которая будет отображать есть ли ошибка или нет.
  //  допустим это будет строка currentError
  //  по умолчанию она будет пустой
  //  если произошла ошибка - в эту пропертю запишется строка, какая именно ошибка произошла

  userNameRef = createRef();
  userLastNameRef = createRef();

  onInputChange = (e) => {
    console.log(e.target.value);
    if (this.state.currentError !== '') {
      this.setState({currentError: ''});
    }
    // todo: если в стейте была записана какая-то ошибка - зачищаем ее при изменении инпута
    //  поскольку в ситуации если пользователь ничего - не ввел - увидел ошибку - понял, что не так - начал вводить данные
    //  было бы хорошо не пугать его висящим сообщением, что все таки что-то не так
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {addUser} = this.props;
    console.log(this.userNameRef, this.userLastNameRef);
    const name = this.userNameRef?.current?.value;
    const lastName = this.userLastNameRef?.current?.value;

    if (name.trim() === "" && lastName.trim() === "") {
      this.setState({
        currentError: 'Please, write your name and your last name',
        inputErrors: {
          userName: true,
          userLastName: true,
        }
      })
    } else if (name.trim() === "") {
      this.setState({
        currentError: 'Please, write your name',
        inputErrors: {
          userName: true,
          userLastName: false,
        }
      })
    } else if (lastName.trim() === "") {
      this.setState({
        currentError: 'Please, write your last name',
        inputErrors: {
          userName: false,
          userLastName: true,
        }
      })
    } else {
      // this.state.currentError = '';
      const user = {
        name: this.userNameRef.current.value,
        lastName: this.userLastNameRef.current.value,
        id: uniqId()
      };
      addUser(user);
    }

    this.userNameRef.current.value = "";
    this.userLastNameRef.current.value = "";

    // Todo: добавить здесь проверку, если пользователь НЕ ВВЕЛ в инпуты ничего - не создаем пост
    //  и обновляем currentError в стейте, кладем сообщение, что пошло не так
    //  если пользователь ввел данные - создаем пост
  };

  onReset = () => {
    this.userNameRef.current.value = "";
      this.userLastNameRef.current.value = ""
  };

  onAlternativeSubmit = (event) => {
    event.preventDefault();
    const {addUser} = this.props;

    const formData = new FormData(event.target);
    debugger
    const user = {
      name: formData.get('userName'),
      lastName: formData.get('userLastName'),
      id: uniqId()
    };
    addUser(user);

    console.log(user)
  };

  render() {
    const {inputErrors} = this.state;
    console.log(inputErrors);
    return (
      <form className={CN} onSubmit={this.onSubmit}>
        <h2>Create new User</h2>
        <div className="form-group">
          <label htmlFor="title" className="input-group-text">Enter your name:</label>
          <input
            ref={this.userNameRef}
            className={`form-control ${inputErrors.userName && 'is-invalid'}`}
            type="text"
            name="userName"
            onChange={this.onInputChange}
          />
          { inputErrors.userName && (<div className="invalid-feedback">
            {EMN.userName}
          </div>)}
        </div>
        <div className="form-group">
          <label htmlFor="text" className="input-group-text">Enter your last name:</label>
          <input
            ref={this.userLastNameRef}
            className={`form-control ${inputErrors.userLastName && 'is-invalid'}`}
            type="text"
            name="userLastName"
            onChange={this.onInputChange}
          />
          {inputErrors.userLastName && (<div className="invalid-feedback">
            {EMN.userLastName}
          </div>)}
        </div>
        <div>
          {this.state.currentError !== '' && (
            <div className="error-message">
              <h2>{this.state.currentError}</h2>
              <img className="img-warning" src={imageAttention} alt="exclamation point"
              />
            </div>)}
        </div>
        {/* todo: Добавить здесь <div> сообщение об ошибке, если такая произошла */}
        {/* todo: стилизуйте это сообщение об ошибке, чтоб текст был красным и броским */}
        {/* todo: можете добавить иконку с восклицательным знаком, чтоб привлечь внимание пользователя */}
        {/* todo: под ошибкой имеется ввиду, что пользователь не ввел данные в инпуты и нажал submit */}
        <Button type="submit" className="btn-outline-secondary" label="Add post"/>
        <div>
          <button
            onClick={this.onReset}
          >Reset
          </button>
        </div>

        {/* ToDo: добавить кнопку для скидывания введеных пользователем значений */}
        {/* ToDo: на кнопке должно быть написано Reset */}
        {/* ToDo: в onClick кнопки прокинуть метод класса onReset (объявлен в строке 51) */}

      </form>
    );
  }
}

export default AddUserForm;
