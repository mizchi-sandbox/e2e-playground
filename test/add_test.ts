import { add } from "../src/add";
import * as assert from "assert";

it("add", () => {
  const added = add(3, 2);
  assert.equal(added, 5);
});
