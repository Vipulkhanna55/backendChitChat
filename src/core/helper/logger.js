export default {
  dataBaseLogs() {
    return {
      success: "database connected successfully",
      reject: "error while connecting database",
    };
  },
  mailLogs() {
    return {
      success: "email sent successfully",
      reject: "error while sending email",
    };
  },
  chatLogs() {
    return {
      failure: "Error while saving chat",
      fetchError: "Error while fetching chat data",
      sendChat: "Error while sending chat",
      fetchChat: "Error while fetching chat",
      connection: "Error in new connection",
    };
  },
};
