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
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { getGroups } from "./services/api";
import { BsPeopleFill, BsImages, BsFillChatDotsFill } from "react-icons/bs";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      groups: [],
      isLoading: false,
    };
  }

  fetchGroups = async (str) => {
    this.setState({ isLoading: true });
    const response = await getGroups(str);
    this.setState({
      userInput: str,
      groups: response.data.groups.group,
      isLoading: false,
    });
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

        {!this.state.isLoading ? (
          this.state.groups.length > 0 && (
            <Container maxW="70%" bg="#f3f5f6">
              <Heading p={4}>Flickr Groups</Heading>
              <Wrap spacing={8} justify="center">
                {this.state.groups.map((group) => (
                  <WrapItem w="45%" key={group.nsid}>
                    <Link
                      to={{
                        pathname: `/gallery/${group.name}`,
                        state: {
                          groupId: group.nsid,
                        },
                      }}
                      key={group.nsid}
                    >
                      <Box bg="white" w="100%">
                        <Flex p={4}>
                          <Avatar
                            size="xl"
                            p={2}
                            bg="none"
                            border="1px"
                            borderColor="lightgrey"
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
                    </Link>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          )
        ) : (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
      </>
    );
  }
}

export default App;
