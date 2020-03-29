import React, { Component } from 'react';
import './PostsList.scss';

const CN = 'posts-list';

export class PostsList extends Component {
  onChangeClick = e => {
    const { onPostSelect } = this.props;
    onPostSelect(e.target.id);
  };

  render() {
    // todo: достать selectedPostId из пропсов
    const { posts, selectedPostId } = this.props;

    return (
      <div className={`${CN} list-group`}>
        {posts.map(post => {
          // todo: добавить класс "active" к div ниже если selectedPostId равен айди поста
          return (
            <div className={`list-group-item ${selectedPostId === post.id ? 'active' : ''}`} key={post.id} id={post.id} onClick={this.onChangeClick}>
              {post.title}
            </div>
          );
        })}
      </div>
    );
  }
}
