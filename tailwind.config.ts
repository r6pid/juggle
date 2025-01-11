import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(182.99deg, rgba(11, 11, 11, 0) -2.38%, rgba(130, 130, 130, 0.2) 30.71%)",
			},
			fontFamily: {
				sans: ["var(--font-inter)"],
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				muted1: "var(--muted1)",
				muted2: "var(--muted2)",
				accent: "var(--accent)",
				warning: "var(--warning)",
				destructive: "var(--destructive)",
				border: "var(--border)",
				sidebar: {
					DEFAULT: "var(--sidebar-background)",
					foreground: "var(--sidebar-foreground)",
					primary: "var(--sidebar-primary)",
					"primary-foreground": "var(--sidebar-primary-foreground)",
					accent: "var(--sidebar-accent)",
					"accent-foreground": "var(--sidebar-accent-foreground)",
					border: "var(--sidebar-border)",
					ring: "var(--sidebar-ring)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
