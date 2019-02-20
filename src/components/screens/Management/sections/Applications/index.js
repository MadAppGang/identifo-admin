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
        component={ApplicationsMainView}
      />
      <Route path="/management/applications/new" component={NewApplicationView} />
      <Route path="/management/applications/:appid" component={EditApplicationView} />
    </Switch>
  );
};

export default ApplicationsSection;
