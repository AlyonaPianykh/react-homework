import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/users.action';
import * as postActions from '../../actions/posts.action';


import { UsersPage as UsersPageComponent } from './UsersPage';

const mapStateToProps = (state) => {
  const { counter, posts, users } = state;
  return {
    counter,
    postsConfig: posts,
    usersConfig: users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
        ...postActions,
        ...userActions,
      }, dispatch)
  };
};

export const UsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersPageComponent);