import React, { useState, PureComponent } from "react";
import { Button } from '../Button/Button';
import { PostImage } from '../PostImage/PostImage';
import "./Post.scss";

export class Post extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      styled: false
    };
    console.log("constructorPost: " + this.props.post.id);
  }

  componentDidMount() {
    console.log("Post componentDidMount " + this.props.post.id);
    // this.interval = setInterval(() => {
    //   console.log("Hello I'm" + this.props.post.id); }, 3000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
    console.log("Post componentWillUnmount " + this.props.post.id);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Post componentDidUpdate" + this.props.post.id);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.post.id !== this.props.post.id;
  // }

  onSelectHandler = () => {
    const {onSelect, post: {id}} = this.props;

    onSelect && onSelect(id)
  };

  onToggleMeHandler = () => {
    this.setState({
      styled: !this.state.styled
    });
  };

  render() {
    const { post: { imgAuthor, authorName, mood, data, text, imgPost }, isClosed } = this.props;
    const { styled } = this.state;

    console.log("renderPost:" + this.props.post.id);

    return (
      <div className={`post card ${styled ? 'styled' : '' }`} onClick={this.onSelectHandler}>
        <div className="card-img-top">
          <PostImage src={imgPost}/> {/* используем другую компоненту, чтоб создать композицию */}
        </div>


        <div className="card-body">
          <h3>{authorName}</h3>
          <p className="text"> {mood} </p>
          <small className="data">{data.toString()}</small>
        </div>

        <div className="block1">
          <p className=" card-text text">{text}</p>

        </div>
        <div className="button">
          <Button  label="Toggle" onClick={this.onToggleMeHandler} />
        </div>
      </div>
    );
  };
}
