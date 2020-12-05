import "./App.css";

import React, { Component } from "react";
import SearchComponent from "./searchComponent";
import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { getGroups } from "./services/api";
import { BsPeopleFill, BsImages, BsFillChatDotsFill } from "react-icons/bs";

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
      <>
        <Container maxW="xl" py={5}>
          <SearchComponent
            options={this.state.options}
            updateSearchInput={(userInput) => this.fetchGroups(userInput)}
          />
        </Container>
        <Container maxW="70%" bg="#f3f5f6">
          <Heading p={2}>Flickr Groups</Heading>
          <Wrap spacing="20px" justify="center">
            {this.state.groups.map((group) => (
              <WrapItem w="45%">
                <Box bg="white" w="100%">
                  <Flex p={4}>
                    <Avatar
                      size="xl"
                      name="Ryan Florence"
                      p={2}
                      bg="none"
                      border="1px"
                      borderStyle="double"
                      src={group.iconurls.large}
                    />
                    <Box p={4}>
                      <Text>{group.name}</Text>
                      <Flex align="center" justify="space-between">
                        <Box px={2}>
                          <Icon mr={1} as={BsPeopleFill} />
                          {group.members}
                        </Box>
                        <Box px={2}>
                          <Icon mr={1} as={BsImages} />
                          {group.pool_count}
                        </Box>
                        <Box px={2}>
                          <Icon mr={1} as={BsFillChatDotsFill} />
                          {group.topic_count}
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Container>
      </>
    );
  }
}

export default App;
