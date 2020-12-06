import { Box, Image, Skeleton, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { getPictures } from "./services/api";
import Masonry from "react-responsive-masonry";

export class gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: [],
      isLoaded: true,
    };
  }

  componentDidMount = async () => {
    console.log(this.props.location.state.groupId);
    this.setState({
        isLoaded:false,
    })
    let response = await getPictures(this.props.location.state.groupId);
    console.log(response);
    this.setState({
      pictures: response.data.photos.photo,
      isLoaded:true
    });
  };

  render() {
    const { pictures, isLoaded } = this.state;
    return (
      <Masonry columnsCount={3} gutter={5}>
        {pictures.map((image, i) => (
            <Skeleton isLoaded={isLoaded}>
          <Box position="relative">
            {image.url_l && <Image src={image.url_l} alt="Picture Not available" />}
            <Box
              px={2}
              opacity="0.8"
              position="absolute"
              bottom="0"
              color="white"
              w="100%"
            >
              <Text fontSize="14px" fontWeight="600">
                {image.title}
              </Text>
              <Text as="i" fontSize="10px">
                By {image.ownername}
              </Text>
            </Box>
          </Box>
          </Skeleton>
        ))}
      </Masonry>
    );
  }
}

export default gallery;
