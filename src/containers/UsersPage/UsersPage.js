import React, { Component } from 'react';
import queryString from 'query-string';
import './UsersPage.scss';

// константы, как правило, пишут большими буквами с нижним подчеркиванием
const DEFAULT_PAGE_NUM = 1;
const DEFAULT_PER_PAGE = 6;
const BIGGER_PER_PAGE = 12;

const CN = 'users-page';

export class UsersPage extends Component {
  componentDidMount() {
    const { location: { search }, usersConfig: { perPage, page } } = this.props;
    // parse search query here
    const params = queryString.parse(search);
    const { page: pageFromUrl, per_page: perPageFromUrl } = params;

    const pPage = perPageFromUrl ? perPageFromUrl : perPage;
    const pageNum = pageFromUrl ? pageFromUrl : page;

    this.loadUsers(pPage, pageNum);
  }

  loadUsers = (perPage, page) => {
    const { actions: { getUsers } } = this.props;
    // todo обратите внимание немного изменены аргументы вызова этой функции
    //    вместо url теперь page, perPage
    getUsers(page, perPage);
  };

  setLowerPerPage = () => {
    const { usersConfig: { page, perPage } } = this.props;

    this.loadUsers(DEFAULT_PER_PAGE, page);
    this.updateUrl(page, DEFAULT_PER_PAGE);
  };

  setHigherPerPage = () => {
    this.loadUsers(BIGGER_PER_PAGE, DEFAULT_PAGE_NUM);
    this.updateUrl(DEFAULT_PAGE_NUM, BIGGER_PER_PAGE);
  };

  updateUrl = (page, per_page) => {
    // апдейт урлы в адресной строке, меняем query search
    const { history } = this.props;
    const newParams = {
      page,
      per_page
    };
    history.replace({ search: queryString.stringify(newParams) });
  };

  setPage = (pageNum) => {
    const { actions: { setPage } } = this.props;

    return () => {
      const { usersConfig: { perPage } } = this.props;
      this.loadUsers(perPage, pageNum);
      this.updateUrl(pageNum, perPage);
    };
  };

  render() {
    const { usersConfig: { usersList, isLoading: isUsersLoading, totalPages, page } } = this.props;

    return (
      <div className={`${CN}  m-4`}>

        <div className={`pagination ${isUsersLoading ? 'disabled' : ''}`}>
          <div className="d-flex justify-items-center align-items-center">
            <div>Total pages: {totalPages}</div>
            <div className="d-flex pages">
              {
                (new Array(totalPages)).fill(1).map((item, index) => (
                  <div key={index} className={`pagination-item ${index + 1 === page ? 'active' : ''}`}
                       onClick={this.setPage(index + 1)}>{index + 1}</div>
                ))
              }
            </div>
            <button onClick={this.setLowerPerPage} className="btn-outline-info m-1">by 6</button>
            <button onClick={this.setHigherPerPage} className="btn-outline-info m-1">by 12</button>
          </div>
        </div>

        {isUsersLoading && <div>Loading...</div>}

        {
          !isUsersLoading && !usersList.length && (
            <div>No user founds</div>
          )
        }

        {
          !isUsersLoading && !!usersList.length && (
            <div className="content">
              {
                usersList.map(user => (
                  <div key={user.id}>{user.first_name} {user.last_name}</div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}
