"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // user dismissed the share sheet
    }
  };

  return (
    <button
      onClick={share}
      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition-all hover:border-amber-500 hover:text-amber-700"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Link Copied
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </button>
  );
}
