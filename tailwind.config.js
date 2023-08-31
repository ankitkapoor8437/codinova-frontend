/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
  "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        primaryColor: "#8873ef",
        headingColor: "#081e21",
        smallTextColor: "#193256",
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
};
