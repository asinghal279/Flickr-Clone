import { Box, Image, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { getPictures } from "./services/api";

export class gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: [],
    };
  }

  componentDidMount = async () => {
    let response = await getPictures();
    console.log(response);
  };

  render() {
    return (
      <Box position="relative" w="fit-content">
        <Image
          src="https://i.pinimg.com/originals/6f/7d/72/6f7d72e12a47d807ef2f8e750b6749fa.png"
          alt="Segun Adebayo"
        />
        <Box px={2} opacity="0.8" position="absolute" bottom="0" color="white" w="100%">
            <Text fontSize="14px" fontWeight="600">Here I am, inaugirating the most importanr data</Text>
            <Text as="i" fontSize="10px">By Raghav Singhal</Text>
        </Box>
      </Box>
    );
  }
}

export default gallery;
