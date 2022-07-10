import React, { useEffect } from "react";
import * as reactHotkeys from "react-hotkeys";

import ResourceLayout from "./Resource/ResourceLayout";
import Login from "./User/Login";
import Signup from "./User/Signup";
import WorkspaceLayout from "./Workspaces/WorkspaceLayout";
import CreateResourceFromExcel from "./Resource/CreateResourceFromExcel";

import PrivateRoute from "./authentication/PrivateRoute";
import NavigationTabsProvider from "./Layout/NavigationTabsProvider";
import ThemeProvider from "./Layout/ThemeProvider";
import { track, dispatch, init as initAnalytics } from "./util/analytics";
import { init as initPaddle } from "./util/paddle";
import { useRouteMatch } from "react-router-dom";
import { OldRoutes } from "./appRoutes";
import { routesGenerator } from "./routesUtil";

const context = {
  source: "amplication-client",
};

const GeneratedRoutes = routesGenerator(OldRoutes);

export const enhance = track<keyof typeof context>(
  // app-level tracking data
  context,

  {
    dispatch,
  }
);

function App() {
  // const location = useLocation();
  const match = useRouteMatch();
  useEffect(() => {
    initAnalytics();
    initPaddle();
  }, []);

  useEffect(() => {
    console.log("match", match);
  }, [match]);

  //The default behavior across all <HotKeys> components
  reactHotkeys.configure({
    //Disable simulate keypress events for the keys that do not natively emit them
    //When Enabled - events are not captured after using Enter in <textarea/>
    simulateMissingKeyPressEvents: false,
    //Clear the ignoreTags array to includes events on textarea and input
    ignoreTags: [],
  });

  return (
    <ThemeProvider>
<<<<<<< HEAD
      <NavigationTabsProvider>{GeneratedRoutes}</NavigationTabsProvider>
=======
      <NavigationTabsProvider>
        <Switch>
          <RouteWithAnalytics path="/login">
            <Login />
          </RouteWithAnalytics>
          <RouteWithAnalytics path="/signup">
            <Signup />
          </RouteWithAnalytics>
          <PrivateRoute
            exact
            path="/github-auth-app/callback"
            component={AuthResourceWithGitCallback}
          />
          <PrivateRoute exact path="/" component={WorkspaceLayout} />
          <PrivateRoute path="/workspace" component={WorkspaceLayout} />
          <PrivateRoute path="/user/profile" component={WorkspaceLayout} />
          <PrivateRoute
            exact
            path="/create-resource"
            component={CreateResourceFromExcel}
          />
          <PrivateRoute path="/:resource" component={ResourceLayout} />
        </Switch>
      </NavigationTabsProvider>
>>>>>>> origin/release/0.15.0
    </ThemeProvider>
  );
}

export default enhance(App);
