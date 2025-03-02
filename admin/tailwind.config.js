 

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1600px', 
        'md': '800px',// Add a custom breakpoint for resolutions larger than 1600 pixels
        'sm': '500px',// Add a custom breakpoint for resolutions larger than 1600 pixels
      },
      animation: {
        "loop-scroll": "loop-scroll 50s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      fontFamily: {
        bukra: ["29LT Bukra", "sans-serif"],
        poppins:["poppins", "sans-serif"]
      },
      fontWeight: {
        bukrabold: "bold",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        iconColor: "#2A2A2A", // Example using hex code
        textColor: "#607D8B", // Example using hex code
        greenColor: "#4BAF4F",
        darkColor:"#212429",
        inputColor: "#EBEBEB",
        buttonColor: "#333333", 
        grayColor: "#EBEBEB" ,
        grayLight:"#F5F5F7", 
        blueDark:"#344155",
        sousTitle: "#6F6F6F",
        blueLight:"#F5F7F8",

      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Ensure the typography plugin is enabled
  ],
};
