import { describe } from 'vitest'

import { mount, config } from "@vue/test-utils"
import Navigation from '../../../components/Navigation.vue'

describe('Navigation component', async () => {
	beforeAll(() => {
		config.global.stubs.NuxtLink = true // { template: '<span />' }
	})

	it('renders properly without pages', () => {
		const wrapper = mount(Navigation)

		const ul = wrapper.find('ul')
		expect(ul.exists()).toBe(true)

		const liElements = wrapper.findAll('li')
		expect(liElements.length).toBe(0)
	})

	it('renders properly with pages and ignores non-main-navigation entries', () => {
		const pages = [
			{
				title: {
					navigation: {
						en: 'page1 title'
					},
				},
				to: '/page1',
				mainNavigation: true
			},
			{
				title: {
					navigation: {
						en: 'page2 title'
					},
				},
				to: '/page2',
				mainNavigation: true
			},
			{
				mainNavigation: false
			},
		]
		const wrapper = mount(Navigation, {
			props: {
				pages
			}
		})

		const liElements = wrapper.findAll('li')
		expect(liElements.length).toBe(2)

		const nuxtLinkStubElements = wrapper.findAll('nuxt-link-stub')
		expect(nuxtLinkStubElements.length).toBe(2)

		expect(nuxtLinkStubElements.at(0).attributes('to')).toBe('/page1')
		expect(nuxtLinkStubElements.at(1).attributes('to')).toBe('/page2')
	})
})
