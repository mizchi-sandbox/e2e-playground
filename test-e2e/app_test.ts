import * as assert from "assert";
import "../src";

declare var App: any;

it("App exists", () => {
  // console.log("href", location.href);
  assert.equal(!!App, true);
  assert.equal(App.add(1, 2), 3);
});

// it("fetch", async () => {
//   const res = await fetch("/base/main.js");
//   const text = await res.text();
//   console.log("fetched", text);
// });
