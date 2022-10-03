import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import NavBarAdmin from "./NavBarAdmin";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import ManageStore from "../pages/ManageStore";
import ManageUser from "../pages/ManageUser";
import Store from "../pages/Store";
import Order from "../pages/Order";
import LikePage from "../pages/LikePage";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;
  // console.log(user);

  return (
    <>
      {user.user_role == "admin" ? (
        <>
          <NavBarAdmin user={user} setUser={setUser} />
          <main style={{ padding: 20 }}>
            <Switch>
              <Route path="/manage_store">{<ManageStore user={user} />}</Route>
              <Route path="/manage_user">{<ManageUser />}</Route>
              <Route path="/">
                <HomePage user={user} />
              </Route>
            </Switch>
          </main>
        </>
      ) : (
        <>
          <NavBar user={user} setUser={setUser} />
          <main style={{ padding: 20 }}>
            <Switch>
              <Route path="/store">{<Store user={user} />}</Route>
              <Route path="/order">{<Order user={user} />}</Route>
              <Route path="/likes">{<LikePage user={user} />}</Route>
              <Route path="/">
                <HomePage user={user} />
              </Route>
            </Switch>
          </main>
        </>
      )}
    </>
  );
}

export default App;
