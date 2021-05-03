const testFunc = require("../api/util/textHandler");

const testStr = "        g            This is test         ";
const testInvalidStr = "This is just a invalid string";

test("remove a key string and return back the text", () => {
  expect(testFunc(testStr)).toBe("This is test");
});

test("When the string is invalid, return empty string", () => {
  expect(testFunc(testInvalidStr)).toBe("");
});
