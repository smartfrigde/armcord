import {BrowserWindow, ipcMain, shell} from "electron";
import path from "path";
import {Settings} from "../types/settings.d.js";
import {getDisplayVersion} from "../common/version.js";
import {getConfig, setConfigBulk} from "../common/config.js";
import {injectThemesMain} from "../common/themes.js";
let settingsWindow: BrowserWindow;
let instance = 0;

export async function createSettingsWindow(): Promise<void> {
    console.log("Creating a settings window.");
    instance += 1;
    if (instance > 1) {
        if (settingsWindow) {
            settingsWindow.show();
            settingsWindow.restore();
        }
    } else {
        settingsWindow = new BrowserWindow({
            width: 660,
            height: 670,
            title: `ArmCord Settings | Version: ${getDisplayVersion()}`,
            darkTheme: true,
            frame: true,
            backgroundColor: "#2f3136",
            autoHideMenuBar: true,
            webPreferences: {
                sandbox: false,
                preload: path.join(import.meta.dirname, "settings", "preload.mjs")
            }
        });
        ipcMain.on("saveSettings", (_event, args: Settings) => {
            setConfigBulk(args);
        });
        ipcMain.handle("getSetting", (_event, toGet: keyof Settings) => {
            return getConfig(toGet);
        });
        async function settingsLoadPage(): Promise<void> {
            await settingsWindow.loadURL(`file://${import.meta.dirname}/html/settings.html`);
        }
        injectThemesMain(settingsWindow);
        settingsWindow.webContents.setWindowOpenHandler(({url}) => {
            void shell.openExternal(url);
            return {action: "deny"};
        });
        await settingsLoadPage();
        settingsWindow.on("close", () => {
            instance = 0;
        });
    }
}
