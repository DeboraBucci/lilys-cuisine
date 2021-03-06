import { timeTextGenerator } from "./timeTextGenerator";

test("should return array with two strings, one for the hours, and the other with the minutes", () => {
  const time = timeTextGenerator(1, 30);
  expect(time).toStrictEqual(["1 h", "30 min"]);

  const time2 = timeTextGenerator(0, 0);
  expect(time2).toStrictEqual(["", "0 min"]);
});
