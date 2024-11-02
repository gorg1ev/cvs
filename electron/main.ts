import { app, BrowserWindow, ipcMain } from "electron";
import { isDev, preloaderPath } from "./utils.js";
import path from "path";
import { generateTehnicalReport } from "./tehnicalReport/generateTehnicalReport.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: preloaderPath(),
      nodeIntegration: true,
    },
  });
  mainWindow.maximize();

  if (isDev()) mainWindow.loadURL("http://localhost:5173");
  else
    mainWindow.loadFile(
      path.join(app.getAppPath(), "/dist-react", "index.html")
    );

  ipcMain.handle(
    "generateTehnicalReport",
    (_, data: VehicleReportFormInputs) => {
      generateTehnicalReport(mainWindow, data);
    }
  );
});
