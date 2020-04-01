import React, { Component } from 'react';
import { Post } from '../../components/Post/Post';
import { Button } from '../../components/Button/Button';
import { allPosts, sortingTypes } from '../../constants';
import { ThemeContext, UserContext } from '../../context';
import { BtnMenu } from '../../components/BtnMenu/BtnMenu';
import { PostsList } from '../../components/PostsList/PostsList';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import { Form } from '../../components/Form/Form';
import { Input } from '../../components/Input/Input';
import { SortingOptionsPanel } from '../../components/SortingOptionsPanel/SortingOptionsPanel';
import AddUserForm from '../../components/AddUserForm/AddUserForm';

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

  addUser = (newUser) => {
    const { usersList } = this.state;

    this.setState({
      usersList: [...usersList, newUser]
    });
  };

  onPostSelect = postId => {
    this.setState({
      selectedPostId: postId
    });
  };

  render() {
    const { postsConfig } = this.props; // todo достать из props actions: {createPost}
    const { posts } = postsConfig;

    const { selectedPostId } = this.state;
    const neededIndex = posts.findIndex(item => item.id === selectedPostId);

    return (
      <ThemeContext.Consumer>
        {value => {
          return (
            <div className={`App ${value}`}>
              <div className="d-flex">
                <div>
                  <Button label="HIDE POST!" onClick={this.hidePost}/>
                  <PostsList posts={posts} onPostSelect={this.onPostSelect}/>
                </div>
                <ErrorBoundary>
                  {!this.state.isPostHidden &&
                  neededIndex !== -1 && (
                    <Post post={posts[neededIndex]}/>
                  )}
                </ErrorBoundary>
              </div>


              <div>
                {
                  this.state.usersList.map((user) => {
                    return <div key={user.id}>{`${user.name} ${user.lastName}`}</div>;
                  })
                }
              </div>
              <AddUserForm addUser={this.addUser}/>

              <UserContext.Consumer>
                {({ user }) => (
                  <Form
                    // addPost={addPost}  // todo использовать тут вместо {addPost} нашу созданую функцию createPost
                    user={user}
                    post={posts[neededIndex]}
                  />
                )}
              </UserContext.Consumer>

            </div>
          );
        }}
      </ThemeContext.Consumer>
    );

  }
}

export default App;
