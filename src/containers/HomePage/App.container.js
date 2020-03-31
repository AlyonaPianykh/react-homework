import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// todo ниже импортнуть функцию createPost
import { sortBy, createPost } from '../../actions/posts.action';
import AppComponent from './App';

const mapStateToProps = (state) => {
  debugger
  const { counter, posts } = state;
  return {
    counter,
    postsConfig: posts
  };
};

const mapDispatchToProps = (dispatch) => {
  // debugger
  return {
    actions: {
      sortBy: (sortType) => dispatch(sortBy(sortType)),
      // todo подвязать функцию createPost к сору с помощью dispatch по аналогии со строкой 21
      //   аргументом будет post
      createPost: (post) => dispatch(createPost(post))
    }
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);