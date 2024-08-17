import {contextBridge, ipcRenderer} from "electron";

contextBridge.exposeInMainWorld("internal", {
    restart: () => ipcRenderer.send("restart"),
    installState: ipcRenderer.sendSync("modInstallState") as string,
    version: ipcRenderer.sendSync("get-app-version", "app-version") as string,
    isDev: ipcRenderer.sendSync("splash-isDev") as string,
    mods: ipcRenderer.sendSync("splash-clientmod") as string,
    getLang: (toGet: string) =>
        ipcRenderer.invoke("getLang", toGet).then((result: string) => {
            return result;
        }),
    splashEnd: () => ipcRenderer.send("splashEnd")
});