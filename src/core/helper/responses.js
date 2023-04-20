function onSuccess(statusCode, message, data) {
  return {
    statusCode,
    message,
    data,
    type: "success",
  };
}
function onError(statusCode, message) {
  return {
    statusCode,
    message,
    type: "failure",
  };
}
function sendResponse(resObject, res) {
  if (resObject.status === "success") {
    const result = {
      status: resObject.type,
      message: resObject.message,
      data: resObject.data,
    };
    return res.status(resObject.statusCode).json(result);
  }
  const error = {
    status: resObject.type,
    message: resObject.message,
  };
  return res.status(resObject.statusCode).json(error);
}
export { onError, onSuccess, sendResponse };
