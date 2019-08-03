declare var App: any;

export function loadScript(src: string): Promise<() => void> {
  console.log("[loadScript] start", src);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
    script.onload = () => resolve(() => script.remove());
    script.onerror = reject;
  });
}

export async function loadMain(): Promise<void> {
  if (App) {
    return;
  } else {
    await loadScript(process.env.ASSET_HOST + "main.js");
  }
}
