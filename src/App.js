import React, { Component } from 'react';
import { Post } from './components/Post/Post';
import { Button } from './components/Button/Button';
import { allPosts, sortingTypes } from './constants';
import { SortingContext, ThemeContext, UserContext } from './context';
import Header from './components/Header/Header';
import { BtnMenu } from './components/BtnMenu/BtnMenu';
import { PostsList } from './components/PostsList/PostsList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Form } from './components/Form/Form';
import { Input } from './components/Input/Input';
import { SortingOptionsPanel } from './components/SortingOptionsPanel/SortingOptionsPanel';
import AddUserForm from "./components/AddUserForm/AddUserForm";

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selectedPostId: allPosts[0].id,
      isPostHidden: false,
      usersList: []
    };
  }

  hidePost = () => {
    this.setState({
      isPostHidden: !this.state.isPostHidden
    });
  };

  saveInputValue = value => {
    this.setState({
      ...this.state,
      inputValue: value
    });
  };

  renderButton = (label, sortType, onClick, sortCondition) => {
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
  onPostSelect = postId => {
    this.setState({
      selectedPostId: postId
    });
  };

  addUser = (newUser) => {
    const { usersList } = this.state;

    this.setState({
      usersList: [...usersList, newUser]
    })
  };

  render() {
    return (
      <SortingContext.Consumer>
        {sortConfig => {
          const { sortType, onSortingChange, posts, addPost } = sortConfig;

          const { selectedPostId } = this.state;
          const neededIndex = posts.findIndex(
            item => item.id === selectedPostId
          );
          return (
            <ThemeContext.Consumer>
              {value => {
                console.log(value); // достаем значение темы из контекста и используем ниже в className
                return (
                  <div className={`App ${value}`}>
                    <Header/>

                    {/* todo: перенести этот JSX в файл components/SortingOptionsPanel/SortingOptionsPanel.js */}
                    {/* todo: перенести этот JSX в файл components/SortingOptionsPanel/SortingOptionsPanel.js (конец)*/}

                    {/* todo: проверить что импорт и использование SortingOptionsPanel не ламает функционала*/}
                    <SortingOptionsPanel/>
                    {/* todo: проверить что импорт и использование SortingOptionsPanel не ламает функционала */}

                    <div className="d-flex">
                      <div>
                        <Button label="HIDE POST!" onClick={this.hidePost}/>
                        {/* todo: добавить в props PostsList пропертю selectedPostId */}
                        {/* todo: в selectedPostId  положить selectedPostId из стейта (объявлено в строке 61) */}
                        <PostsList posts={posts} selectedPostId={selectedPostId} onPostSelect={this.onPostSelect}/>
                      </div>
                      <ErrorBoundary>
                        {!this.state.isPostHidden &&
                        neededIndex !== -1 && (
                          <Post post={posts[neededIndex]}/>
                        )}
                      </ErrorBoundary>
                    </div>

                    {/* todo: обратите внимание - пример инпута (controlled input) */}
                    <div className="card input-example">
                      <label className="custom-label">Input example:</label>
                      <Input
                        value={this.state.inputValue}
                        onValueChange={this.saveInputValue}
                      />
                      <p>{this.state.inputValue}</p>
                    </div>

                    <div>
                      {
                        this.state.usersList.map((user) => {
                          return <div key={user.id}>{`${user.name} ${user.lastName}`}</div>
                        })
                      }
                    </div>
                    <AddUserForm addUser={this.addUser}/>

                    <UserContext.Consumer>
                      {({ user }) => (
                        <Form
                          addPost={addPost}
                          user={user}
                          post={posts[neededIndex]}
                        />
                      )}
                    </UserContext.Consumer>

                    <div className="all-posts">
                      {/*{*/}
                      {/*  posts.map((post) => {*/}
                      {/*    return (*/}
                      {/*      <Post post={post} key={post.id}/>*/}
                      {/*    );*/}
                      {/*  })*/}
                      {/*}*/}
                    </div>
                  </div>
                );
              }}
            </ThemeContext.Consumer>
          );
        }}
      </SortingContext.Consumer>
    );
  }
}

export default App;
