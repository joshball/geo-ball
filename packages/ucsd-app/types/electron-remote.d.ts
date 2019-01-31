declare module "electron-remote" {
    export function requireTaskPool(modulePath: string, maxConcurrency?: number | undefined, idleTimeout?: number | undefined, methodTimeout?: number | undefined): Proxy;
}

// declare function requireTaskPool(modulePath: string, maxConcurrency:number, idleTimeout:number, methodTimeout:number): Proxy;
