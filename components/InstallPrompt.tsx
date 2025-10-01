"use client";

import React, { useEffect, useState } from "react";
import IconLogo from "@/public/icons/Dojo-Logo_Red_RGB.svg"

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function beforeInstallPromptHandler(e: any) {
      e.preventDefault();
      let isInstalled = localStorage.getItem('install_prompt');
      if (!isInstalled) {
        setDeferredPrompt(e);
        setIsVisible(true); // Show your install button
      }
    }
    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);


    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
        localStorage.setItem('install_prompt', 'installed');
      } else {
        console.log("User dismissed the install prompt");
        localStorage.setItem('install_prompt', 'declined');
      }
      setDeferredPrompt(null);
      setIsVisible(false);
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('install_prompt', 'declined');
  }

  if (!isVisible) return null;

  return (
    <div className="fixed flex gap-10 items-center justify-center w-full bg-white bottom-0 left-0 px-25 md:px-50 py-15 z-[99] border-t-2 border-t-grey">
      <IconLogo className="w-40 h-auto text-gold" />
      <div className="text-14 md:text-16"> Add Dojo Agency to Home Screen</div>
      <div className="flex gap-10 ml-auto">
        <button
          onClick={handleClose}
          className=" btn "
        >
          Close
        </button>
        <button
          onClick={handleInstallClick}
          className=" btn "
        >
          Install App
        </button>
      </div>
    </div>
  );
}
