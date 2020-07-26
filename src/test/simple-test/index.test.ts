import simple from "./";

describe("Simple", () => {
  it("Should sum correctly", () => {
    const result = simple(5, 5);
    expect(result).toEqual(10);
  });

  // it("Should return 0", () => {
  //   const result = simple(0, 0);
  //   expect(result).toEqual(0);
  // });
});
