import { Injectable } from "@angular/core";
type AppendType = "head" | "body";
@Injectable({
  providedIn: "root",
})
export class ScriptLoaderService {
  private scripts: Map<
    string,
    { loaded: boolean; src: string; append: AppendType }
  > = new Map<string, { loaded: boolean; src: string; append: AppendType }>();

  constructor() {}

  addScript(name: string, src: string, append: AppendType) {
    if (!this.scripts.has(name)) {
      this.scripts.set(name, { loaded: false, src, append });
    }
  }

  // load a single or multiple scripts
  load(...scripts: string[]) {
    const promises: any[] = [];
    // push the returned promise of each loadScript call
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    // return promise.all that resolves when all promises are resolved
    return Promise.all(promises);
  }

  // load the script
  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts.get(name).loaded) {
        resolve({ script: name, loaded: true, status: "Already Loaded" });
      } else {
        // load script
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = this.scripts.get(name).src;
        // cross browser handling of onLoaded event
        if (script["readyState"]) {
          // IE
          script["onreadystatechange"] = () => {
            if (
              script["readyState"] === "loaded" ||
              script["readyState"] === "complete"
            ) {
              script["onreadystatechange"] = null;
              this.scripts.get(name).loaded = true;
              resolve({ script: name, loaded: true, status: "Loaded" });
            }
          };
        } else {
          // Others
          script.onload = () => {
            this.scripts.get(name).loaded = true;
            resolve({ script: name, loaded: true, status: "Loaded" });
          };
        }
        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: "Loaded" });
        // finally append the script tag in the DOM
        document
          .getElementsByTagName(this.scripts.get(name).append)[0]
          .appendChild(script);
      }
    });
  }
}
