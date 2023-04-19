export default {
  globalcatch(req, err) {
    console.log(
      `Error in catch with route ${req.path} with metod ${req.method} and with message ${err.message}`
    );
  },
};
