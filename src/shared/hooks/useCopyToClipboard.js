import { useState } from "react";
import { toast } from "react-toastify";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    if (!navigator.clipboard) {
      toast.error('Clipboard API not supported')
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Copied to clipboard!')
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return { copied, copyToClipboard };
}