import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter} from 'react-router';
import { PostDetailsPage as PostDetailsPageComponent } from './PostDetailsPage';

const mapStateToProps = (state) => {
  debugger
  const { counter, posts } = state;
  return {
    counter,
    postsConfig: posts
  };
};

export const PostDetailsPage = withRouter(connect(mapStateToProps)(PostDetailsPageComponent));