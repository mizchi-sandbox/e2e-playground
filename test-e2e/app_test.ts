import * as assert from "assert";
import "../src";

declare var App: any;

it("App exists", () => {
  console.log("href", location.href);
  assert.equal(!!App, true);
  assert.equal(App.add(1, 2), 3);
});
