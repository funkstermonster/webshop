import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            grey: "#dcd6f7",
            blue: "#a6b1e1",
            lilac: "#AD9CC0",
            puce: "#B4869F",
            pink: "#A67387",
            rose: "#985F6F",
            eggplant: "#73566B",
            violet: "#4E4C67",
            "violet-ultra": "#5E5C75",
            "grey-dark": "#6D6B82",
            "text-primary": "#fff",
            "text-secondary": "#000",
          },
        },
      },
    }),
  ],
};
export default config;
