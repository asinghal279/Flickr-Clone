const { default: Axios } = require("axios");

const key = `fa9da8fd0fc564e7f49da614b4d1613e`;

export const getGroups = (str) => {
  return Axios.get(
    `https://www.flickr.com/services/rest/?method=flickr.groups.search&extras=extras=extras=datecreate%2Cdate_activity%2Ceighteenplus%2Cinvitation_only%2Cneeds_interstitial%2Cnon_members_privacy%2Cpool_pending_count%2Cprivacy%2Cmember_pending_count%2Cicon_urls%2Cdate_activity_detail%2Cuse_vespa%2Cmembership_info%2Chas_pending_invite%2Csecure_rules&api_key=${key}&text=${str}&format=json&per_page=20&nojsoncallback=?`
  );
};
