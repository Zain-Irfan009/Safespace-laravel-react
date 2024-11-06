/** @type {import('tailwindcss').Config} */
export default {
  content: ["./resources/js/react/index.html", "./resources/js/react/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(180deg, #008d49, #018ba3)",
      },
      keyframes: {
        fadeInSlideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutSlideDown: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
      },
      animation: {
        fadeInSlideUp: "fadeInSlideUp 0.3s ease-out forwards",
        fadeOutSlideDown: "fadeOutSlideDown 0.3s ease-out forwards",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "&::-webkit-scrollbar": {
            display: "none",
          },

          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
