import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Score More",
    short_name: "Score More",
    description:
      "Keep your score in this immersive scoreboard for all your games",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.svg",
        sizes: "512x512",
        type: "image/svg",
      },
    ],
    theme_color: "#0a0127",
    background_color: "#0a0127",
    display: "standalone",
    scope:
      "https://score-even-more.vercel.app/",
    start_url:
      "https://score-even-more.vercel.app/",
    orientation: "portrait",
  },
  devOptions: {
    enabled: false,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestConfig)],
  server: {
    open: "/",
  },
});
