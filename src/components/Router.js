import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import Programs from "../pages/programs"
import EmptyPage from "../pages/EmptyPage";
import Appeal from "../pages/Аppeal"
import Reference from "../pages/Reference"
import Settings from "../pages/Settings"
import RouterEmployees from "../pages/Employees";

const Router = () => (
  <Switch>
    <Route path="/programs" component={Programs}/>
    <Route path="/employees" component={RouterEmployees}/>
    <Route path="/appeal" component={Appeal}/>
    <Route path="/reference" component={Reference}/>
    <Route path="/settings" component={Settings}/>
    <Route path="/" component={EmptyPage}/>
    <Redirect to="/" />
  </Switch>
)

export default Router
