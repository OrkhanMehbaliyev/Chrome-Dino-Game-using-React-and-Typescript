export function customSetInterval(callback: () => void, interval: number) {
  return setTimeout(function recurrier() {
    callback();
    setTimeout(recurrier, interval);
  }, interval);
}
