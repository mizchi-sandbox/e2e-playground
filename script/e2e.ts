export {};
const axios = require("axios");
const path = require("path");
const child_process = require("child_process");

const INTERNAL_PORT = 9333;
const ASSET_HOST = `http://localhost:${INTERNAL_PORT}/`;

async function startServer() {
  // build asset with ASSET_HOST
  child_process.execSync("yarn webpack --mode production", {
    cwd: path.resolve(__dirname, ".."),
    env: { ...process.env, PORT: INTERNAL_PORT, ASSET_HOST }
  });
  // run server
  const proc = child_process.spawn("yarn", ["ts-node", "-T", "index.ts"], {
    cwd: path.resolve(__dirname, "../api-server"),
    env: { ...process.env, PORT: INTERNAL_PORT }
  });
  proc.stdout.on("data", (data: any) => {
    console.log("[server]", data.toString());
  });

  // ensure server ready
  let retlyCount = 10;
  while (true) {
    if (retlyCount < 1) {
      throw new Error("Can not boot server");
    }
    await new Promise(r => setTimeout(r, 1500));
    try {
      const res = await axios.get(`${ASSET_HOST}health`);
      console.log("ready", res.data);
      break;
    } catch (e) {
      console.log("wait for server...");
    }
    retlyCount--;
  }
  return () => {
    child_process.spawn("kill", [proc.pid]);
  };
}

function runTest() {
  return new Promise((resolve, reject) => {
    const proc = child_process.spawn(
      "yarn",
      ["karma", "start", "--single-run"],
      {
        cwd: path.resolve(__dirname, ".."),
        env: { ...process.env, PORT: INTERNAL_PORT, ASSET_HOST }
      }
    );

    proc.stdout.on("data", (data: any) => {
      console.log("[test]", data.toString());
    });

    proc.on("close", (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
}

async function main() {
  const unlisten = await startServer();

  try {
    await runTest();
    unlisten();
    process.exit(0);
  } catch (err) {
    console.error("status", err);
    unlisten();
    process.exit(1);
  }
}

main();
