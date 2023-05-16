import { Client } from "memjs";

const memcached = Client.create();

const components = {
  like: Client.create(),
  post: Client.create(),
  user: Client.create(),
  comment: Client.create(),
  relationship: Client.create(),
  chat: Client.create(),
};

const setCacheData = async (id, data, model) => {
  return await components[model].set(id, JSON.stringify(data), { expires: 12 });
};

const verifyCache = (id, model) => {
  components[model].get(id, (err, val) => {
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
