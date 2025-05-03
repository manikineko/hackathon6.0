"use client";
import { useEffect } from "react";

export default function BootstrapClientInit() {
  useEffect(() => {
    import("jquery");
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}
