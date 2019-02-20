import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ApplicationsMainView from './MainView';
import NewApplicationView from './NewApplicationView';

const ApplicationsSection = () => {
  return (
    <Switch>
      <Route
        exact
        path="/management/applications/"
        component={ApplicationsMainView}
      />
      <Route path="/management/applications/new" component={NewApplicationView} />
    </Switch>
  );
};

export default ApplicationsSection;
