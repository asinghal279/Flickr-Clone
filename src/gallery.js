import { Box, Center, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React, { Component } from "react";
import { getPictures } from "./services/api";
import Masonry from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";

export class gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: [],
      page: 0,
      poolPending: true,
    };
  }

  fetchPictures = async () => {
    let response = await getPictures(
      this.props.location.state.groupId,
      this.state.page + 1
    );
    if (response.data && response.data.photos) {
      this.setState({
        pictures: [...this.state.pictures, ...response.data.photos.photo],
        page: this.state.page + 1,
        poolPending:
          response.data.photos.page === response.data.photos.pages
            ? false
            : true,
      });
    }
  };

  componentDidMount = () => {
    this.setState({
      page: 1,
    });
    this.fetchPictures();
  };

  render() {
    const { pictures, poolPending } = this.state;
    return (
      <InfiniteScroll
        dataLength={pictures.length}
        next={this.fetchPictures}
        hasMore={poolPending}
        loader={
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        }
      >
        <Flex justify="center">
          <Box w="80%">
            <Masonry columnsCount={3} gutter={5}>
              {pictures.map((image, i) => (
                <Box position="relative" key={image.id}>
                  {image.url_l && (
                    <Image src={image.url_l} alt="Picture Not available" />
                  )}
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
              ))}
            </Masonry>
          </Box>
        </Flex>
      </InfiniteScroll>
    );
  }
}

export default gallery;
