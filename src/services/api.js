const { default: Axios } = require("axios");

const key = `fa9da8fd0fc564e7f49da614b4d1613e`;

export const getGroups = (str) => {
  return Axios.get(
    `https://www.flickr.com/services/rest/?method=flickr.groups.search&extras=extras=extras=datecreate%2Cdate_activity%2Ceighteenplus%2Cinvitation_only%2Cneeds_interstitial%2Cnon_members_privacy%2Cpool_pending_count%2Cprivacy%2Cmember_pending_count%2Cicon_urls%2Cdate_activity_detail%2Cuse_vespa%2Cmembership_info%2Chas_pending_invite%2Csecure_rules&api_key=${key}&text=${str}&format=json&per_page=20&nojsoncallback=?`
  );
};

export const getPictures = () => {
  return Axios.get(
    `https://api.flickr.com/services/rest?extras=can_addmeta%2Ccan_comment%2Ccan_download%2Ccan_print%2Ccan_share%2Ccontact%2Ccount_comments%2Ccount_faves%2Ccount_views%2Cdate_taken%2Cdate_upload%2Cdescription%2Cicon_urls_deep%2Cisfavorite%2Cispro%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cowner_datecreate%2Cpath_alias%2Cperm_print%2Crealname%2Crotation%2Csafety_level%2Csecret_k%2Csecret_h%2Curl_sq%2Curl_q%2Curl_t%2Curl_s%2Curl_n%2Curl_w%2Curl_m%2Curl_z%2Curl_c%2Curl_l%2Curl_h%2Curl_k%2Curl_3k%2Curl_4k%2Curl_f%2Curl_5k%2Curl_6k%2Curl_o%2Cvisibility%2Cvisibility_source%2Co_dims%2Cpubliceditability%2Cdatecreate%2Cdate_activity%2Ceighteenplus%2Cinvitation_only%2Cneeds_interstitial%2Cnon_members_privacy%2Cpool_pending_count%2Cprivacy%2Cmember_pending_count%2Cicon_urls%2Cdate_activity_detail&page=1&get_group_info=1&group_id=1215107%40N24&method=flickr.groups.pools.getPhotos&api_key=${key}&format=json&per_page=50&nojsoncallback=?`
  );
};