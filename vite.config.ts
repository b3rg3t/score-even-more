import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Score more",
    short_name: "score-more",
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
    theme_color: "transparent",
    background_color: "#0a0127",
    display: "standalone",
    // scope:
    //   "https://score-even-more-git-feature-pwa-david-bergs-projects.vercel.app/",
    // start_url:
    //   "https://score-even-more-git-feature-pwa-david-bergs-projects.vercel.app/",
    orientation: "portrait",
  },
  // devOptions: {
  //   enabled: true,
  // },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestConfig)],
  server: {
    open: "/",
  },
});
