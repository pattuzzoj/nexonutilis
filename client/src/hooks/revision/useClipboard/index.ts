import { Accessor, Setter, createEffect, createSignal } from "solid-js";

interface ClipboardOptions {
  log?: boolean;
  onSuccess?: (value: string) => void;
  onError?: (error: string) => void;
  onUnavailable?: (message: string) => void;
}

type ClipboardReturn = [
  Accessor<string>,
  Setter<string>,
  utils: {
    isClipboardAvailable: () => boolean
  }
];

function useClipboard(value: string, { log, onSuccess, onError, onUnavailable }: ClipboardOptions = {}): ClipboardReturn {
  const [clipboardValue, setClipboardValue] = createSignal<string>(value);

  function isClipboardAvailable() {
    return navigator.clipboard ? true : false;
  }

  createEffect(() => {
    if (!isClipboardAvailable()) {
      onUnavailable?.("Clipboard API Unavailable");
      if (log) {
        console.warn(`[WARN] Clipboard API Unavailable\nHook: useClipboard\nMessage: "Clipboard API is not available"`);
      }
      return;
    }

    try {
      navigator.clipboard.writeText(clipboardValue());
      onSuccess?.(clipboardValue());
      if (log) {
        console.log(`[INFO] Clipboard Write\nHook: useClipboard\nValue: "${clipboardValue()}"`);
      }
    } catch (error: unknown) {
      onError?.("Failed to copy");
      if (log) {
        console.error(`[ERROR] Clipboard Write\nHook: useClipboard\nMessage: "${(error instanceof Error) ? error.message : "Unknown error"}"`);
      }
    }
  });

  return [clipboardValue, setClipboardValue, { isClipboardAvailable }];
}

export default useClipboard;
