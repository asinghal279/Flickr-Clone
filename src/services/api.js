const { default: Axios } = require("axios");

const key = `fa9da8fd0fc564e7f49da614b4d1613e`;

export const getGroups = (str) => {
  return Axios.get(
    `https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=${key}&text=${str}&format=json&per_page=20&nojsoncallback=?`
  )
};
