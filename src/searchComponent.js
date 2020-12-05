import React, { Component } from "react";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";

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

  onChange = (e) => {
    const { options } = this.props;
    const userInput = e.currentTarget.value;
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
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
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 13) {
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption],
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption - 1 === filteredOptions.length) {
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  render() {
    const {
      onChange,
      onKeyDown,
      onClick,
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
        </InputGroup>
        {optionList}
      </Box>
    );
  }
}

export default searchComponent;
