import { client } from '../bot'

function Say (chan:any, timeout:any, message:any) {
    return setTimeout(() => {
      client.privmsg(chan, message);
    }, timeout);
  }
  
export default Say