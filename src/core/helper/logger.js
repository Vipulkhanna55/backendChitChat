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
};
