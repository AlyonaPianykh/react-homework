import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import {
  AppConfigContext,
  ThemeContext,
  UserContext
} from '../../context';
import { Header } from '../../components/Header';
import { App } from '../../containers/HomePage';
import { PostsPage } from '../../containers/PostsPage';
import { allLinks, allPosts, sortingTypes, user } from '../../constants';
import { PostDetailsPage } from '../../containers/PostDetailsPage';
import NotFound from '../../containers/NotFound/NotFound';
import { UsersPage } from '../../containers/UsersPage';

export function AppWrapper(props) {
  const [userRole, setUserRole] = useState(user.role);

  const toggleUserRole = () => {
    setUserRole(userRole === 'admin' ? 'user' : 'admin');
  };
  // const addPost = newPost => {
  //   setPosts([...posts, newPost]);
  // };
  return (
    <Provider store={store}>
      <AppConfigContext.Provider value={allLinks}>
        <UserContext.Provider
          value={{
            user: {
              ...user,
              role: userRole
            },
            toggleUserRole
          }}
        >
          <ThemeContext.Provider value={'light'}>
            <Router>
              <Header/>

              <Switch>
                <Route exact path="/">
                  <App/>
                </Route>
                <Route exact path="/home">
                  <App/>
                </Route>

                {/* чтоб иметь доступ к history, match, location PostPage обвернут в withRouter */}
                <Route exact path="/posts">
                  <PostsPage/>
                </Route>

                {/* прокидываются history, match, location  автоматом в пропсы*/}
                <Route exact path="/users" component={UsersPage}/>

                {/* в props лежат history, match, location */}
                <Route path="/posts/:id" render={(props) => <PostDetailsPage {...props}/>}/>

                <Route path="/not-found" component={NotFound}/>

                <Redirect from="*" to="/not-found"/>
                {/*<Route path="*" component={NotFound}/>*/}
              </Switch>

            </Router>
          </ThemeContext.Provider>
        </UserContext.Provider>
      </AppConfigContext.Provider>
    </Provider>
  );
}
