import React, { Component } from 'react';
import { BtnMenu } from '../../components/BtnMenu/BtnMenu';
import { sortingTypes } from '../../constants';
import { Button } from '../../components/Button/Button';
import { Post } from '../../components/Post/Post';
import './PostsPage.scss';
const CN = 'posts-page';

export class PostsPage extends Component {

  onSelectPost = (id) => {
    const { history, match: { url } } = this.props;

    history.push(`${url}/${id}`);
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

  renderSortingPanel = () => {
    const { postsConfig: { sortType }, actions: {sortBy}} = this.props;

    return (
      <div className="sorting-options d-flex justify-items-center align-items-center">
        <label className="custom-label">Sorting options:</label>
        <BtnMenu
          options={Object.keys(sortingTypes)}
          onSortingChange={sortBy}
        />
        {this.renderButton(
          'Sort by author',
          sortType,
          sortBy,
          sortingTypes.BY_AUTHOR
        )}
        {this.renderButton(
          'Sort by date',
          sortType,
          sortBy,
          sortingTypes.BY_DATE
        )}
      </div>
    );
  };

  render() {
    console.log('Posts page props', this.props);
    // const { postsConfig: { sortType, onSortingChange, posts, addPost } = this.props;
    const { postsConfig: { posts }} = this.props;

    return (
      <div className={CN}>
        {this.renderSortingPanel()}

        <div className="all-posts">
          {
            posts.map((post) => {
              return (
                <Post post={post} key={post.id} onSelect={this.onSelectPost}/>
              );
            })
          }
        </div>
      </div>
    );


  }
}
