export default {
  genResponse: function (status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  },
};
