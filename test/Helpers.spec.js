import expect from 'expect'
import {
	mount
} from '@vue/test-utils'
import Helpers from '../index.js'
import Questions from '../components/Questions.vue'

const inputTitle = 'input[name=title]'
const defaultSentence = 'Vue test helpers'

describe('Questions', () => {
	let wrapper, b

	beforeEach(() => {
		wrapper = mount(Questions)

		b = new Helpers(wrapper, expect)
	})

	it('tests see(text, selector) method with selector', () => {
		b.see('Where am i ?', 'h2')
	})

	it('tests the see(text) method without selector', () => {
		b.see('Where am i ?')
	})

	it('tests the type(text, input) method', () => {
		b.type('hello', inputTitle)
		b.inputValueIs('hello', inputTitle)
	})

	it('tests the click(selector) method', () => {
		b.click('.edit')

		b.see('Update')
		b.see('Cancel')
	})

	it('tests emitted(event)', () => {
		b.click('.edit')
		b.emitted('isEditing')
	})

	it('tests emitted(event, data)', () => {
		b.click('.edit')
		b.emittedContains('isEditing', 40)
	})

	it('tests emitted(event, codes)', () => {
		wrapper.vm.fireStatus()
		b.emittedContains('status', 200, 500)
	})

	it('tests emittedContains(event, array)', () => {
		wrapper.vm.firePrices()
		b.emittedContains('prices', [10, 20])
	})

	it('tests emittedContains(event, object)', () => {
		wrapper.vm.fireObject()

		b.emittedContains('obj', {
			product: 'iPhone X'
		})
	})

	it('tests inputValueIs(text, selector)', () => {
		b.type(defaultSentence, inputTitle)

		b.inputValueIs(defaultSentence, inputTitle)
	})

	it('tests inputValueIsNot(text, selector)', () => {
		b.type(defaultSentence, inputTitle)

		b.inputValueIsNot('V', inputTitle)
	})

	it('checks domHas(selector)', () => {
		b.domHas('h2')
	})

	it('checks domHasNot(selector)', () => {
		b.domHasNot('h1')
	})

	it('checks domHasNot(selector)', () => {
		b.domHasNot('Mwangaben')
	})

	it('ckecks if is hidden', () => {
		b.hidden('ul')
	})

	it('checks doNotSee(text)', () => {
		b.doNotSee('Hello')
	})

	it('confirm the existance of a class container in a DOM', () => {
		b.hasAClass('container')
	})

	it('confirms that a class container does not exist on first div to be found on a DOM', () => {
		b.doesNotHaveAClass('containers', 'div')
	})

	it('h2 has a class attribute display-4', () => {
		b.hasAttribute('class', 'display-4', '.container h2')
	})

	it('h2 hasn\'t a class attribute display-3', () => {
		b.doesNotHaveAttribute('class', 'display-3', '.container h2')
	})
})