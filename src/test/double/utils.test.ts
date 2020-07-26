import { patching, checkOrder, Item, checkShipping } from "./utils";

describe("patching", () => {
  it("Should return Old", () => {
    const result = patching(1595735307514);

    expect(result).toEqual("Old");
  });

  it("Should return Young", () => {
    // const now = global.Date.now;
    //
    // global.Date.now = () => {
    //   return 1595735304514;
    // };

    const result = patching(1595735307514);

    expect(result).toEqual("Young");

    // global.Date.now = now;
  });
});

describe("checkOrder", () => {
  it("Should return all ready", () => {
    const items: Item[] = [
      {
        id: 1,
        count: 1,
      },
      {
        id: 2,
        count: 2,
      },
    ];

    const result = checkOrder(items, () => {
      return false;
    });

    expect(result.ready).toEqual([1, 2]);
  });

  it("Should return all ready with item count = 0", () => {
    const items: Item[] = [
      {
        id: 1,
        count: 1,
      },
      {
        id: 2,
        count: 0,
      },
    ];

    const mock = jest.fn((id) => {
      return id === 2;
    });

    const result = checkOrder(items, mock);

    expect(result.ready).toEqual([1, 2]);

    expect(mock).toBeCalledWith(2);
  });

  it("Should return ready and not ready", () => {
    const items: Item[] = [
      {
        id: 1,
        count: 1,
      },
      {
        id: 2,
        count: 0,
      },
      {
        id: 3,
        count: 0,
      },
    ];

    const mock = jest.fn((id) => {
      return false;
    });

    const result = checkOrder(items, mock);

    expect(result.ready).toEqual([1]);

    expect(result.notReady).toEqual([2, 3]);

    expect(mock.mock.calls[0][0]).toEqual(2);

    expect(mock.mock.calls[1][0]).toEqual(3);
  });
});

// jest.mock("./helper.ts", () => ({
//   checkShip: () => {
//     return true;
//   },
// }));

jest.mock("./helper.ts");

describe("checkShipping", () => {
  it("Should return all ready", () => {
    const items: Item[] = [
      {
        id: 1,
        count: 1,
      },
      {
        id: 2,
        count: 1,
      },
    ];

    const result = checkShipping(items);

    expect(result.ready).toEqual([1, 2]);
  });
});