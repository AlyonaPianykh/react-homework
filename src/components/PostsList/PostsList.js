import React, { Component } from 'react';
import './PostsList.scss';

const CN = 'posts-list';

export class PostsList extends Component {
  onChangeClick = e => {
    const { onPostSelect } = this.props;
    onPostSelect(e.target.id);
  };
  render() {
    // todo: достать selectedPostId из пропсов+++
    const { selectedPostId } = this.props;
    const { posts } = this.props;

    return (
      <div className={`${CN} list-group`}>
        {posts.map(post => {
          // todo: добавить класс "active" к div ниже если selectedPostId равен айди поста+++
          const ClA = (post.id === selectedPostId ? 'active' : ' ');
          return (
            <div className={`list-group-item ${ClA}`} key={post.id} id={post.id} onClick={this.onChangeClick}>
              {post.title}
            </div>
          );
        })}
      </div>
    );
  }
}
