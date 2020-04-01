import React, { Component, useState } from 'react';
import {
  useParams,
  useHistory
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { Post } from '../../components/Post/Post';
import { SortingContext } from '../../context';
import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import './PostDetailsPage.scss';

const CN = 'post-page';
export const PostDetailsPage = (props) => {
  // чтоб доступится к id и history, если не использовать withRouter то можно юзнуть хуки, поскольку это функциональная компонента
  let { id } = useParams();
  let history = useHistory();
  const { postsConfig: { posts } } = props;

  // пример использования объекта history
  const goBack = () => {
    history.goBack();
  };
  const post = posts.find(item => item.id === id);

  if (!post) return history.push('/not-found');

  return (
    <div className={CN}>
      <div className='back-btn' onClick={goBack}>{'<'} Back</div>

      <ErrorBoundary>
        <Post post={post}/>
      </ErrorBoundary>

      {/*{post && <Post post={post}/>}*/}
      {/*{!post && <div> No post found For current id {id}</div>}*/}
    </div>
  );
};
