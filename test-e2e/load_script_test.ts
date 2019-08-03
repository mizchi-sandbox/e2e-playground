import * as assert from "assert";
import { loadMain } from "./helpers/loadScript";

it("fetch main.js", async () => {
  await loadMain();
  // @ts-ignore
  assert.equal(App.add(1, 2), 3);
});

it("load mod", async () => {
  // @ts-ignore
  const mod = await App.loadMod();
  assert.equal(mod.default, 1);
});
