import * as assert from "assert";
import "../src";

it("App exists", () => {
  assert.equal(!!App, true);
  assert.equal(App.add(1, 2), 3);
});
