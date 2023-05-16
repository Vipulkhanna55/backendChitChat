import tests from "../testHelper";

describe("sequentially run tests", () => {
  tests.userTestSuite();
  tests.postTestSuite();
  tests.commentTestSuite();
  tests.likeTestSuite();
});
