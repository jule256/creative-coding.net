import { beforeEach } from 'vitest'
import { useEntry } from '../../../composables/useEntry'
import * as helpers from '../../../helpers/helpers'

const flushPromises = () => {
	return new Promise(process.nextTick)
}

describe('useEntry composable', () => {

	afterEach(() => {
		// console.log(`calling clearAllMocks()`)

		// vi.clearAllMocks()
		// vi.restoreAllMocks()
	})

	beforeEach(() => {
		// console.log(`calling restoreAllMocks()`)

		// vi.clearAllMocks()
		// vi.restoreAllMocks()
	})

	it.skip('updates the highlighted computed if isHover changes', () => {
		const data = {
			isHighlighted: false
		}
		const composable = useEntry(data)
		expect(composable.isHighlighted.value).toEqual(false)
		composable.isHover.value = true
		expect(composable.isHighlighted.value).toEqual(true)
	})

	it.skip('sets the highlighted computed to true if data key is set', () => {
		const data = {
			isHighlighted: true
		}
		const composable = useEntry(data)
		expect(composable.isHighlighted.value).toEqual(true)
	})

	it.skip('sets the toggle-title computed to the correct value if expanded', () => {
		const data = {
			isHighlighted: false,
			isExpanded: false
		}
		const composable = useEntry(data)
		expect(composable.toggleTitle.value).toEqual('show this entry')
	})

	it.skip('sets the toggle-title computed to the correct value if not expanded', () => {
		const data = {
			isHighlighted: false,
			isExpanded: true
		}
		const composable = useEntry(data)
		expect(composable.toggleTitle.value).toEqual('hide this entry')
	})

	it.skip('sets the initial max-height to "none"', () => {
		const data = {
			isHighlighted: true
		}
		const composable = useEntry(data)
		expect(composable.maxHeight.value).toEqual('none')
	})

	it.skip('sets the initial max-height to a value if data key is set', () => {
		const data = {
			isHighlighted: true,
			height: 666
		}
		const composable = useEntry(data)
		expect(composable.maxHeight.value).toEqual('666px')
	})

	it.skip('correctly emits "collapse" when toggling', () => {
		const emit = vi.fn()

		/*
		vi.mock('../../../helpers/helpers', () => ({
			isTouchDevice: () => false
		}))/**/

		const data = {
			id: 'the id',
			isHighlighted: true,
			isExpanded: true,
		}
		const composable = useEntry(data, emit)
		composable.handleToggle()
		expect(emit).toHaveBeenCalledTimes(1)
		expect(emit).toHaveBeenCalledWith(
			'status-change',
			{
				id: 'the id',
				type: 'collapse'
			}
		)
	})/**/

	it.skip('correctly emits "expand" when toggling', () => {
		const emit = vi.fn()

		/* vi.mock('../../../helpers/helpers', () => ({
			isTouchDevice: () => false
		})) /**/
		/*
		const helpers = import('../../../helpers/helpers')
		helpers.isTouchDevice = vi.fn().mockReturnValueOnce(() => {
			console.log(`using mocked isTouchDevice() one`)
			return true
		})
		/**/
		/**/
		vi.mock('../../../helpers/helpers', () => {
			return {
				isTouchDevice: () => {
					console.log(`using mocked isTouchDevice() one`)
					return true
				}
			}
		})/**/

		const data = {
			id: 'the id',
			isExpanded: false,
			isHighlighted: true
		}
		const composable = useEntry(data, emit)
		composable.handleToggle()
		expect(emit).toHaveBeenCalledTimes(1)
		expect(emit).toHaveBeenCalledWith(
			'status-change',
			{
				id: 'the id',
				type: 'expand'
			}
		)

		vi.restoreAllMocks()
	})/**/

	it.skip('updates the hover-state when toggling on touch devices', async () => {

		/*
		const helpers = await import('../../../helpers/helpers')

		console.log(`helpers 1`, helpers.isTouchDevice)
		/**/

		/*
		helpers.isTouchDevice = await vi.fn().mockReturnValueOnce({
			isTouchDevice: () => true
		})
		/**/
		/*
		helpers.isTouchDevice = await vi.fn().mockReturnValueOnce(() => {
			console.log(`using mocked isTouchDevice() two`)
			return true
		})
		console.log(`helpers 2`, helpers)
		/**/
		/**/
		vi.mock('../../../helpers/helpers', () => {
			console.log(`mocking ...`)

			return {
				isTouchDevice: () => {
					console.log(`using mocked isTouchDevice() two TRUE`)

					return true
				}
			}
		})/**/

		const data = {
			id: 'the id',
			isHighlighted: true
		}
		const composable = useEntry(data, () => { })
		composable.isHover.value = true
		expect(composable.isHover.value).toEqual(true)
		composable.handleToggle()
		expect(composable.isHover.value).toEqual(false)
	})

	it('...correctly emits "expand" when toggling', () => {
		const emit = vi.fn()

		const helperIsTouchDeviceSpy = vi.spyOn(helpers, 'isTouchDevice').mockImplementation(() => {
			console.log(`using mocked isTouchDevice() THREE`)
			return true
		})

		const data = {
			id: 'the id',
			isExpanded: false,
			isHighlighted: true
		}
		const composable = useEntry(data, emit)
		composable.handleToggle()
		expect(emit).toHaveBeenCalledTimes(1)
		expect(emit).toHaveBeenCalledWith(
			'status-change',
			{
				id: 'the id',
				type: 'expand'
			}
		)

		helperIsTouchDeviceSpy.mockRestore()
	})

	it('updates the hover-state when toggling on touch devices ...', () => {

		const helperIsTouchDeviceSpy = vi.spyOn(helpers, 'isTouchDevice').mockImplementation(() => {
			console.log(`using mocked isTouchDevice() FOUR`)
			return true
		})

		const data = {
			id: 'the id',
			isHighlighted: true
		}
		const composable = useEntry(data, () => { })
		composable.isHover.value = true
		expect(composable.isHover.value).toEqual(true)
		composable.handleToggle()
		expect(composable.isHover.value).toEqual(false)

		helperIsTouchDeviceSpy.mockRestore()
	})
	/**/
})
