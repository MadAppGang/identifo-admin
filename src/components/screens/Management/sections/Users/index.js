import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersMainView from './MainView';
import NewUserView from './NewUserView';
import EditUserView from './EditUserView';

const UsersSection = () => {
  return (
    <Switch>
      <Route exact path="/management/users" component={UsersMainView} />
      <Route path="/management/users/new" component={NewUserView} />
      <Route path="/management/users/:userid" component={EditUserView} />
    </Switch>
  );
};

export default UsersSection;
