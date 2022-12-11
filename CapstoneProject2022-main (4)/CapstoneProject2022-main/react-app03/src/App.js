import "./App.css";
import NewUser2 from "./Pages/NewUser2";
import Login2 from "./Pages/login2.js";
import AdminDashboard2 from "./Pages/AdminDashboard2";
import LeadDashboard3 from "./Pages/Leaddashboard3";
import ForgotPassword from "./Pages/ForgotPassword";
import ProfilePage from "./Pages/ProfilePage";
import AdminNewUser from "./Pages/AdminNewUser";
import ChangePassword from "./Pages/ChangePassword"
import AdminAllowanceDashBoard3 from "./Pages/AdminAllowanceDashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home.js";
import React from "react";
import AuthApi from "./AuthAPI";

function App() {
  const [auth, setAuth] = React.useState(false);

  const readStore = () => {
    if (localStorage.getItem("user")) setAuth(true);
  };

  React.useEffect(() => {
    readStore();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute renderComponent={Home} redirect={"/profile"} />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  renderComponent={Login2}
                  redirect={"/profile"}
                />
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  renderComponent={NewUser2}
                  redirect={"/profile"}
                />
              }
            ></Route>
            <Route
              path="/adminadduser"
              element={
                <ProtectedAdminRoute
                  renderComponent={AdminNewUser}
                  redirect={"/profile"}
                />
              }
            ></Route>
            <Route
              path="/forgotPassword"
              element={
                <ProtectedRoute
                  renderComponent={ForgotPassword}
                  redirect={"/profile"}
                />
              }
            ></Route>
            <Route
              path="/changePassword"
              element={
                <ProtectedProfileRoute
                  renderComponent={ChangePassword}
                  redirect={"/profile"}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <ProtectedProfileRoute
                  renderComponent={ProfilePage}
                  redirect={"/"}
                />
              }
            ></Route>
            <Route path="/admindashboard" element={<AdminDashboard2 />}></Route>
            <Route path="/leadDashboard" element={<LeadDashboard3 />}></Route>
            <Route
              path="/adminallowancedashboard"
              element={<AdminAllowanceDashBoard3 />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </AuthApi.Provider>
  );
}

const ProtectedRoute = ({
  renderComponent: RenderComponent,
  redirect: redirectLink,
}) => {
  var Auth = React.useContext(AuthApi);
  if (Auth.auth) return <Navigate to={redirectLink} replace={true} />;
  else return <RenderComponent />;
};

const ProtectedProfileRoute = ({
  renderComponent: RenderComponent,
  redirect: redirectLink,
}) => {
  var Auth = React.useContext(AuthApi);
  if (Auth.auth) return <RenderComponent />;
  else return <Navigate to={redirectLink} replace={true} />;
};

const ProtectedAdminRoute = ({
  renderComponent: RenderComponent,
  redirect: redirectLink,
}) => {
  var location = useLocation();
  if (
    location.state &&
    JSON.parse(localStorage.getItem("user")).role === "Admin"
  )
    return <RenderComponent />;
  else return <Navigate to={redirectLink} replace={true} />;
};
export default App;