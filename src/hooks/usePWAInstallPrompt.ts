import { useCallback, useEffect, useRef, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt(): Promise<void>;
};

const PROMPT_SHOWN_AT_KEY = 'pwa-install-prompt-shown-at';

const hasPromptBeenRecentlyShown = () =>
  +(window.localStorage.getItem(PROMPT_SHOWN_AT_KEY) ?? 0) + 100_000 > new Date().getTime();

const recordPromptBeenShown = () => {
  window.localStorage.setItem(PROMPT_SHOWN_AT_KEY, '' + new Date().getTime());
};

const isBrowserOnIOS = () => /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());

const isStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

const usePWAInstallPrompt = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOSBrowser, setIsIOSBrowser] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>();

  const dismiss = useCallback(() => {
    setIsInstallable(false);
    recordPromptBeenShown();
  }, []);

  const install = useCallback(async () => {
    await deferredPrompt.current?.prompt();
    deferredPrompt.current = null;
    dismiss();
  }, [dismiss]);

  useEffect(() => {
    if (isStandaloneMode() || hasPromptBeenRecentlyShown()) {
      return;
    }

    if (isBrowserOnIOS()) {
      setIsInstallable(true);
      setIsIOSBrowser(true);
      return;
    }

    const onPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
    };
  }, []);

  return { isInstallable, isIOSBrowser, install, dismiss };
};

export default usePWAInstallPrompt;
