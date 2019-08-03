import * as assert from "assert";
import { loadMain } from "./helpers/loadScript";

it("loadMain build App instance", async () => {
  await loadMain();
  assert.equal(App.add(1, 2), 3);
});

it("load mod via splitted chunk", async () => {
  const mod = await App.loadMod();
  assert.equal(mod.default, 1);
});
