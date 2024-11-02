import { dialog, app } from "electron";
import fs from "fs";
import path from "path";

export function saveAsDialog(
  BrowserWindow: Electron.BaseWindow,
  fileName: string,
  file: Buffer
) {
  dialog
    .showSaveDialog(BrowserWindow, {
      defaultPath: path.join(app.getPath("downloads"), fileName),
    })
    .then((result) => {
      if (!result.canceled && result.filePath) {
        fs.writeFile(result.filePath, file, (err) => {
          console.log(err);
        });
      }
    });
}
