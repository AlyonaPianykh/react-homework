import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter} from 'react-router';
import { PostsPage as PostsPageComponent } from './PostsPage';
import { sortBy } from '../../actions/posts.action';

const mapStateToProps = (state) => {
  debugger
  const { counter, posts } = state;
  return {
    counter,
    postsConfig: posts
  };
};

const mapDispatchToProps = (dispatch) => {
  debugger
  return {
    actions: {
      sortBy: (sortType) => dispatch(sortBy(sortType)),
    }
  };
};

export const PostsPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsPageComponent));