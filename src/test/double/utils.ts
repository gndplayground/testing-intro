import { checkShip } from "./helper";

export type Result = {
  ready: number[];
  notReady: number[];
};

export type Item = {
  id: number;
  count: number;
};

export function patching(time: number) {
  const now = Date.now();

  if (time < now) {
    return "Old";
  }

  return "Young";
}

export function checkOrder(items: Item[], cb: (id: number) => boolean): Result {
  const result: Result = {
    ready: [],
    notReady: [],
  };

  items.forEach((item) => {
    if (item.count > 0 || cb(item.id)) {
      result.ready = [...result.ready, item.id];
    } else {
      result.notReady = [...result.notReady, item.id];
    }
  });

  return result;
}

export function checkShipping(items: Item[]): Result {
  const result: Result = {
    ready: [],
    notReady: [],
  };

  items.forEach((item) => {
    if (checkShip(item.id)) {
      result.ready = [...result.ready, item.id];
    } else {
      result.notReady = [...result.notReady, item.id];
    }
  });

  return result;
}
