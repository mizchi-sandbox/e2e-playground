import * as assert from "assert";
import { add } from "../src/add";

it("add", () => {
  assert.equal(add(1, 2), 3);
});
