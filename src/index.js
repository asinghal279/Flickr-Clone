import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Gallery from "./gallery";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <Switch>
          <Route exact component={App} path="/"></Route>
          <Route component={Gallery} path="/gallery/:groupName"></Route>
        </Switch>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
