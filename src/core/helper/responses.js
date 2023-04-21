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
function sendResponse(responseObject, response) {
  if (responseObject.type === "success") {
    const result = {
      status: responseObject.type,
      message: responseObject.message,
      data: responseObject.data,
    };
    return response.status(responseObject.statusCode).json(result);
  }
  const error = {
    status: responseObject.type,
    message: responseObject.message,
  };
  return response.status(responseObject.statusCode).json(error);
}
export { onError, onSuccess, sendResponse };
