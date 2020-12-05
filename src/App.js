import "./App.css";

import React, { Component } from "react";
import SearchComponent from "./searchComponent";
import { Container } from "@chakra-ui/react";
import { getGroups } from "./services/api";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      groups: [],
    };
  }

  fetchGroups = async (str) => {
    const response = await getGroups(str);
    this.setState({ userInput: str, groups: response.data.groups.group });
  };

  render() {
    return (
      <Container maxW="xl" py={5}>
        <SearchComponent
          options={this.state.options}
          updateSearchInput={(userInput) => this.fetchGroups(userInput)}
        />
      </Container>
    );
  }
}

export default App;
