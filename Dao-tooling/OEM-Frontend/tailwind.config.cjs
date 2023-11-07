/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bodyBg: "#F7F7F7",
        rnBlack: "#1E1E3C",
        btnBlack: "#484848",
        btnBlue: "#2765C2",
        btnGray: "#F1F1F1",
        btnGrayHover: "#535353",
        textGray: "#676778",
        lowTextGray: "#A8A8A8",
        shade: "#F0F0F0",
        blueShadeBorder: "#DDEAFC",
        blueShade: "#E9F2FF",
        grayShadeBorder: "#F3F3F3",
        grayShade: "#FBFBFB",
        highlight: "#F8EED5",
        popGray: "#F7F7F7",
        searchGray: "#F9F9F9",
      },
    },
  },
  plugins: [],
};
