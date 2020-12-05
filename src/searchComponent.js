import React, { Component } from "react";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import { getGroups } from "./services/api";

class searchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: "",
    };
  }

  onChange = async(e) => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    let response = await getGroups(userInput);
    this.setState({
      activeOption: 0,
      filteredOptions,
      showOptions: true,
      userInput,
    });
  };

  onClick = (e) => {
    this.setState({
      activeOption: 0,
      filteredOption: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  onKeyDown = (e) => {
    const { activeOption, filteredOptions, showOptions } = this.state;
    if (showOptions && e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption],
      });
    } else if (showOptions && e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (showOptions && e.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      onChange,
      onKeyDown,
      onClick,
      handleSubmit,
      state: { activeOption, filteredOptions, showOptions, userInput },
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredOptions.length) {
        optionList = (
          <Stack p={5}>
            {filteredOptions.map((optionName, index) => {
              let className = "";
              if (index === activeOption) {
                className = "lightgrey";
              }
              return (
                <Button bg={className} key={optionName} onClick={onClick}>
                  {optionName}
                </Button>
              );
            })}
          </Stack>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Search2Icon color="gray.300" />}
              />
              <Input
                type="phone"
                placeholder="Enter group name..."
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
              />
              <Button ml={2} type="submit">
                Search
              </Button>
            </InputGroup>
          </FormControl>
        </form>
        {optionList}
      </Box>
    );
  }
}

export default searchComponent;
