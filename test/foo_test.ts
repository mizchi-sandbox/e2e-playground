import { add } from "../src/add";
import * as assert from "assert";

it("ok in ts", () => {
  const added = add(3, 2);
  assert.equal(added, 5);
});
