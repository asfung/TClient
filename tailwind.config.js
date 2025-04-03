// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./components/**/*.{js,vue,ts}",
//     "./layouts/**/*.vue",
//     "./pages/**/*.vue",
//     "./plugins/**/*.{js,ts}",
//     "./app.vue",
//     "./error.vue",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
const defaultColors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      // this is just for fun
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },

      fontFamily: {
        // 'ia-writer': ['IA Writer Quattro S', 'sans-serif'],
        // 'ia-writer-bold': ['IA Writer Quattro S Bold', 'sans-serif'],
        // 'ia-writer-italic': ['IA Writer Quattro S Italic', 'sans-serif'],
        // 'ia-writer-bold-italic': ['IA Writer Quattro S Bold Italic', 'sans-serif'],
        'base': ['IA Writer Quattro S', 'sans-serif'],
        'base-bold': ['IA Writer Quattro S Bold', 'sans-serif'],
        'base-italic': ['IA Writer Quattro S Italic', 'sans-serif'],
        'base-bold-italic': ['IA Writer Quattro S Bold Italic', 'sans-serif'],
      },
      colors: {
        ...defaultColors,
        // 'black': "#121212",
        // 'white': "#F5F5F5",
        'black': '#000000',
        'white': '#FFFFFF',

        // right side color on icon #545FDE
        // left side color on icon #F2547B

        'primary': "#545FDE",
        'primaryLight': "#7985E6",
        'primaryDark': "#323AAF",
        'accent': "#F2547B",
        'accentLight': "#F58FA3",
        'accentDark': "#C13F63",
        'neutral': {
          'light': "#F3F4F6",
          'DEFAULT': "#9CA3AF",
          'dark': "#1A1A1A",
        },
        'highlight': "#FFD166",
        'success': "#10B981",
        'error': "#EF4444",

        'bujang': '#eb34a8',

        

      }
    }
  }
}
