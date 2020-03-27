import React, {Component} from 'react';
import uniqId from 'uniqid';
import './Form.scss';
import {Button} from '../Button/Button';

const CN = 'custom-form';

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      id: uniqId()
    };

  }

  onLabelChange = (event) => {
    const {id} = event.target;

    console.log(event.target.value);

    this.setState({
      [id]: event.target.value
    });
  };

  onReset = () => {
    this.setState({
      title: '',
      text: ''
    })
    // todo: имплементнуть функцию скидывания значений, введеных пользователем
  };

  onSubmit = () => {
    const {user, addPost} = this.props;

    const newPost = {
      ...this.state,
      data: new Date(),
      mood: 'happy',
      authorName: `${user.name} ${user.lastName}`
    };

    addPost(newPost); // создаем новый пост

    this.setState({ // зануляем значения в стейте, чтоб сбросить формочку
      id: uniqId(),
      title: '',
      text: ''
    });
  };

  onTooltipHandler = () => {
    if (this.state.text.trim() === "" && this.state.title.trim() === "") {
      return 'Please, write your title and text';
    } else if (this.state.text.trim() === "") {
      return 'Please, write your text';
    } else if (this.state.title.trim() === "") {
      return 'Please, write your title'
    }
    return ""
  };

  render() {
    return (
      <div className={CN}>
        <h2>Create new Post</h2>
        <div className="form-group">
          <label htmlFor="title" className="input-group-text">Enter post title:</label>
          <input
            className="form-control"
            type="text"
            id="title"
            onChange={this.onLabelChange}
            value={this.state.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text" className="input-group-text">Enter post text:</label>
          <input
            className="form-control"
            name="text-input"
            type="text"
            id="text"
            onChange={this.onLabelChange}
            value={this.state.text}
          />
        </div>
        <div>
          <button
            onClick={this.onReset}
          >Reset
          </button>
        </div>
        {/* ToDo: добавить кнопку для скидывания введеных пользователем значений */}
        {/* ToDo: на кнопке должно быть написано Reset */}
        {/* ToDo: в onClick кнопки прокинуть метод класса onReset (объявлен в строке 29) */}

        {/* ToDo: прокинуть в строке 86 пропсу isDisabled которая равна true если в стейте пустые строки для title и text */}
        <Button
          className="btn-outline-secondary"
          onClick={this.onSubmit}
          label="Add post"
          isDisabled={this.state.text.trim() === "" && this.state.title.trim() === ""}
          title={this.onTooltipHandler()}
        />
      </div>
    );
  };
}

