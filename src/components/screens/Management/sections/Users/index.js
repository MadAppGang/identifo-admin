import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersMainView from './MainView';
import NewUserView from './NewUserView';

const UsersSection = () => {
  return (
    <Switch>
      <Route exact path="/management/users" component={UsersMainView} />
      <Route path="/management/users/new" component={NewUserView} />
    </Switch>
  );
};

export default UsersSection;
