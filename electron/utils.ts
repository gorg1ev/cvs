import { app } from "electron";
import path from "path";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function preloaderPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
}
