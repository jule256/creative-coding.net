import { defineConfig } from "vitest/config"
import Vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"

export default {
	plugins: [
		Vue(),
		AutoImport({
			imports: [
				"vue",
			],
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		deps: {
			inline: [/@nuxt\/test-utils/],
		},
	},
}