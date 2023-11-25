import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/styles/global.css";
import "./App.css";

import Header from "./components/Header/header";
import TinderCards from "./components/Cards/TinderCards";
import SwipeButtons from "./components/Buttons/SwipeButtons";
import Chats from "./components/Chats/Chats";
import ChatScreen from "./components/Chats/ChatScreen/index";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import SignupCompany from "./pages/SignupCompany";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import SelectRegister from "./pages/SelectRegister";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <PrimeReactProvider>
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/select-register">
              <SelectRegister />
            </Route>

            <Route path="/signup-company">
              <SignupCompany />
            </Route>

            <Route path="/signin">
              <Signin />
            </Route>

            {/* Profile screen */}
            <Route path="/profile">
              <Header backButton="/" />
              <Profile/>
            </Route>

            {/* Individual chat screen */}
            <Route path="/chat/:person">
              <Header backButton="/chat" />
              <ChatScreen />
            </Route>

            {/* Chats screen */}
            <Route path="/chat">
              <Header backButton="/" />
              <Chats />
            </Route>

            {/* Tinder Cards */}
            <Route path="/">
              <Header />
              <TinderCards />
              {/*  Buttons bellow tinder cards */}
              <SwipeButtons />
            </Route>
          </Switch>
        </Router>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
