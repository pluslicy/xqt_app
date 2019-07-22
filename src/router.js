import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import MainPage from './routes/MainPage'
import Video from './routes/video/Layout'
import Attendance from './routes/attendance/Layout'
import My from './routes/my/Layout'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <MainPage>
          <Route path="/" exact component={Attendance} />
          <Route path="/video" exact component={Video} />
          <Route path="/my" exact component={My} />
        </MainPage>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
