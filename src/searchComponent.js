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
import { throttle } from "throttle-debounce";

class searchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: "",
    };
    this.autocompleteSearchThrottled = throttle(500, this.updateOptions);
  }

  updateOptions = async (q) => {
    this.fetchOptions(q);
  };

  fetchOptions = async (q) => {
    let response = await getGroups(q);
    this.setState({
      filteredOptions: response.data.groups ? response.data.groups.group.splice(0,5) : [],
    });
  };

  onChange = (e) => {
    const userInput = e.currentTarget.value;
    this.setState({
      activeOption: 0,
      showOptions: true,
      userInput
    })
    this.autocompleteSearchThrottled(userInput);
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
        userInput: filteredOptions[activeOption].name,
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
    console.log(this.state);
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
                  {optionName.name}
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
