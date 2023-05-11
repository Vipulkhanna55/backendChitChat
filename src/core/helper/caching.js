import { Client } from "memjs";

const memcached = Client.create();

const setCacheData = async (id, data) => {
  return await memcached.set(id, JSON.stringify(data), { expires: 12 });
};

const verifyCache = (id) => {
  memcached.get(id, (err, val) => {
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
