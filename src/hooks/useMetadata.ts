import { useEffect } from "react";
import {
  applyMetadata,
  updateTitle,
  updateDescription,
  updateOGImage,
} from "@/utils/metadata";
import { metadata } from "@/metadata";

export function useMetadata() {
  useEffect(() => {
    applyMetadata();
  }, []);

  return {
    updateTitle,
    updateDescription,
    updateOGImage,
    metadata,
  };
}

export function usePageMetadata(
  title?: string,
  description?: string,
  ogImage?: string
) {
  useEffect(() => {
    if (title) {
      updateTitle(title);
    }
    if (description) {
      updateDescription(description);
    }
    if (ogImage) {
      updateOGImage(ogImage);
    }
  }, [title, description, ogImage]);

  return {
    updateTitle,
    updateDescription,
    updateOGImage,
  };
}
