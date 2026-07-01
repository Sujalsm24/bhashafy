 "/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: [\"class\"],
    content: [\"./src/**/*.{js,jsx,ts,tsx}\", \"./public/index.html\"],
    theme: {
        extend: {
            fontFamily: {
                serif: ['\"Instrument Serif\"', \"serif\"],
                sans: ['\"Manrope\"', \"system-ui\", \"sans-serif\"],
            },
            colors: {
                background: \"hsl(var(--background))\",
                foreground: \"hsl(var(--foreground))\",
                card: {
                    DEFAULT: \"hsl(var(--card))\",
                    foreground: \"hsl(var(--card-foreground))\",
                },
                popover: {
                    DEFAULT: \"hsl(var(--popover))\",
                    foreground: \"hsl(var(--popover-foreground))\",
                },
                primary: {
                    DEFAULT: \"hsl(var(--primary))\",
                    foreground: \"hsl(var(--primary-foreground))\",
                },
                secondary: {
                    DEFAULT: \"hsl(var(--secondary))\",
                    foreground: \"hsl(var(--secondary-foreground))\",
                },
                muted: {
                    DEFAULT: \"hsl(var(--muted))\",
                    foreground: \"hsl(var(--muted-foreground))\",
                },
                accent: {
                    DEFAULT: \"hsl(var(--accent))\",
                    foreground: \"hsl(var(--accent-foreground))\",
                },
                destructive: {
                    DEFAULT: \"hsl(var(--destructive))\",
                    foreground: \"hsl(var(--destructive-foreground))\",
                },
                border: \"hsl(var(--border))\",
                input: \"hsl(var(--input))\",
                ring: \"hsl(var(--ring))\",
                terracotta: \"#D35400\",
                terracottaHover: \"#C0392B\",
                indigoDeep: \"#1A237E\",
                cotton: \"#FAF9F6\",
                surface: \"#F2F0E9\",
                borderWarm: \"#E5E2D9\",
                textMain: \"#1C1C1E\",
                textMuted: \"#5C5C60\",
                saffron: \"#F39C12\",
            },
            borderRadius: {
                lg: \"var(--radius)\",
                md: \"calc(var(--radius) - 2px)\",
                sm: \"calc(var(--radius) - 4px)\",
            },
            keyframes: {
                \"accordion-down\": { from: { height: \"0\" }, to: { height: \"var(--radix-accordion-content-height)\" } },
                \"accordion-up\": { from: { height: \"var(--radix-accordion-content-height)\" }, to: { height: \"0\" } },
                \"fade-up\": { \"0%\": { opacity: 0, transform: \"translateY(20px)\" }, \"100%\": { opacity: 1, transform: \"translateY(0)\" } },
            },
            animation: {
                \"accordion-down\": \"accordion-down 0.2s ease-out\",
                \"accordion-up\": \"accordion-up 0.2s ease-out\",
                \"fade-up\": \"fade-up 0.6s ease-out both\",
            },
        },
    },
    plugins: [require(\"tailwindcss-animate\")],
};
"
