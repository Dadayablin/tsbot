const got = require("got");

async function getUser(user:any) {
    let data = await got(
      `https://api.ivr.fi/v2/twitch/user/${encodeURIComponent(user)}?id=true`,
      { responseType: "json", throwHttpErrors: false }
    );
    if (!data.body.id) {
      data = await got(
        `https://api.ivr.fi/v2/twitch/user/${encodeURIComponent(user)}`,
        { responseType: "json", throwHttpErrors: false }
      );
      if (!data.body.id) {
        return;
      }
    }
    return data.body;
  }
  
export default getUser