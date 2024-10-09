import type { Keybind } from "./keybind.js";
import type { Settings } from "./settings.js";

export interface ArmCordWindow {
    window: {
        show: () => void;
        hide: () => void;
        minimize: () => void;
        maximize: () => void;
    };
    electron: string;
    setTrayIcon: (favicon: string) => void;
    getLang: (toGet: string) => Promise<string>;
    getDisplayMediaSelector: () => Promise<string>;
    version: string;
    platform: string;
    openThemesWindow: () => void;
    openQuickCssFile: () => void;
    restart: () => void;
    translations: string;
    settings: {
        getConfig: () => Readonly<Settings>;
        setConfig: <K extends keyof Settings>(object: K, toSet: Settings[K]) => void;
        openStorageFolder: () => void;
        copyDebugInfo: () => void;
        copyGPUInfo: () => void;
        addKeybind: (keybind: Keybind) => void;
        editKeybind: (id: string, keybind: Keybind) => void;
        removeKeybind: (id: string) => void;
    };
}

declare global {
    interface Window {
        armcord: ArmCordWindow;
    }
}
