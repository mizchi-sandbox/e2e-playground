import "promise-polyfill/src/polyfill";
import { add } from "./add";

function loadMod() {
  return import("./mod");
}

// @ts-ignore
window.App = {
  add,
  loadMod
};
