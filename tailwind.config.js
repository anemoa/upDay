/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    important: true,
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                blue: {
                    100: '#edf5fb',
                    200: '#d5e9f8',
                    300: '#afdbfd',
                    400: '#6abcf9',
                    500: '#35A4F7',
                    800: '#317BB3',
                    900: '#23557b',
                },
                mint: {
                    100: '#e6f4f2',
                    200: '#c5ebe6',
                    300: '#9be0d6',
                    400: '#59ccbb',
                },
                green: {
                    100: '#f1fae5',
                    200: '#e2f2cd',
                    300: '#bde18e',
                    400: '#a6de83',
                },
                yellow: {
                    100: '#fff9e6',
                    200: '#fef2c8',
                    300: '#ffeba5',
                    400: '#f9e872',
                },
                orange: {
                    100: '#fbecdf',
                    200: '#fbdcc3',
                    300: '#fec08c',
                    400: '#fdaf6e',
                },
                red: {
                    100: '#fceceb',
                    200: '#f8c2be',
                    300: '#f89c95',
                    400: '#f9786e',
                },
                pink: {
                    100: '#fff1f5',
                    200: '#ffdee7',
                    300: '#ffc2d3',
                    400: '#ff99b6',
                },
                purple: {
                    100: '#f2f2ff',
                    200: '#e3e3f4',
                    300: '#d2d2fb',
                    400: '#bd96d9',
                },
                neutral: {
                    100: '#ffffff',
                    200: '#f7f7f7',
                    300: '#d3d3d3',
                    400: '#a6a6a6',
                    500: '#7a7a7a',
                    600: '#686868',
                    700: '#555555',
                    800: '#363636',
                    900: '#121212',
                },
                
            },
            animation: {
                'slide-up': 'slide-Up 0.8s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                slideUp: {
                    '0%': { 
                        transform: 'translateY(20px)',
                        opacity: '0', 
                    },
                    '100%': { 
                        transform: 'translateY(0)',
                        opacity: '1', 
                    },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-none': {
                    '-ms-overflow-style': 'none' /* IE, Edge */,
                    'scrollbar-width': 'none' /* Firefox */,
                    '&::-webkit-scrollbar': {
                        display: 'none' /* Chrome, Safari */,
                    },
                },
            });
        },
    ],
};
