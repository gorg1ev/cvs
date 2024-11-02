const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  generateTehnicalReport(data) {
    electron.ipcRenderer.invoke("generateTehnicalReport", data);
  },
} satisfies Window["electron"]);
