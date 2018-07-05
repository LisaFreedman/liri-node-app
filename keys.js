console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  // consumer_key: jNwMcE3I58LW3opoJF61h6S5H,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  // consumer_secret: lhsd8cSpjbgsAGn21lDAOGUpobCWZ9MzrUu4xORBvRz1m3zCMq,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  // access_token_key: 930606198054830080-bmGlgVKBSvCeVY8DzRO1RE5qwNPVmJd,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  // access_token_secret: EYSKV3S4eMSGQxUQS76kUUkRpBgRg4fwMohbuITrAJstz
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
