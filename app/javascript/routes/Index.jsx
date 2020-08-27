import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Meetings from "../components/Meetings";
import NewMeeting from "../components/NewMeeting";
import EditMeeting from "../components/EditMeeting";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/meetings" exact component={Meetings} />
      <Route path="/meeting" exact component={NewMeeting} />
      <Route path="/meeting/:meetingId" exact component={EditMeeting} />
    </Switch>
  </Router>
);