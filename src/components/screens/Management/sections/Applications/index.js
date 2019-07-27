import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ApplicationsMainView from './MainView';
import NewApplicationView from './NewApplicationView';
import EditApplicationView from './EditApplicationView';

const ApplicationsSection = () => {
  return (
    <Switch>
      <Route
        exact
        path="/management/applications/"
        render={props => <ApplicationsMainView {...props} />}
      />
      <Route
        path="/management/applications/new"
        render={props => <NewApplicationView {...props} />}
      />
      <Route
        path="/management/applications/:appid"
        render={props => <EditApplicationView {...props} />}
      />
    </Switch>
  );
};

export default ApplicationsSection;
