import { Client } from "memjs";
import cachedKey from './cachedKey.js';
 
const components = {
  [cachedKey.LIKE] : Client.create(),
  [cachedKey.CHAT]: Client.create(),
  [cachedKey.COMMENT]: Client.create(),
  [cachedKey.POST]: Client.create(),
  [cachedKey.RELATIONSHIP]: Client.create(),
  [cachedKey.USER]: Client.create(),
};

const setCacheData = async (id, data, model) => {
  return await components[[model]].set(id, JSON.stringify(data), { expires: 12 });
};

const verifyCache = (id, model) => {
  components[[model]].get(id, (err, val) => {
    if (err) {
      console.log(err);
      return;
    }
    if (val !== null) {
      return JSON.parse(val);
    } else {
      return null;
    }
  });
};

export default { setCacheData, verifyCache };
