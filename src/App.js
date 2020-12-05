import "./App.css";

import React, { Component } from "react";
import SearchComponent from "./searchComponent";
import { Container } from "@chakra-ui/react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        "Papaya",
        "Persimmon",
        "Paw Paw",
        "Prickly Pear",
        "Peach",
        "Pomegranate",
        "Pineapple",
      ],
    };
  }

  render() {
    return (
      <Container maxW="xl" py={5}>
        <SearchComponent options={this.state.options} />
      </Container>
    );
  }
}

export default App;
