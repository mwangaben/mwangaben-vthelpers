import theExpect from 'expect'
class Helpers {
	constructor(wrapper) {
		this.wrapper = wrapper
		this.expect = theExpect 
	}

	// dom
	see(text, selector) {
		const wrap = selector ? this.wrapper.find(selector) : this.wrapper
		this.expect(wrap.html()).toContain(text)
	}

	doNotSee(text) {
		this.expect(this.wrapper.html()).not.toContain(text)
	}

	hidden(selector) {
		const node = this.find(selector)
		this.expect(node.isVisible()).toBe(false)
	}

	domHas(selector) {
		this.expect(this.wrapper.contains(selector)).toBe(true)
	}

	domHasNot(selector) {
		this.expect(this.wrapper.contains(selector)).toBe(false)
	}

	hasAClass(name, selector=null) {
		selector ? this.expect(this.find(selector).classes()).toContain(name) : 
		this.expect(this.wrapper.classes()).toContain(name)
	}

	doesNotHaveAClass(name, selector=null) {
		selector ? this.expect(this.find(selector).classes()).not.toContain(name) : 
		this.expect(this.wrapper.classes()).not.toContain(name)
	}

	hasAttribute(attr, value, selector) {
		this.expect(this.find(selector).attributes()[attr]).toBe(value)
	}

	doesNotHaveAttribute(attr, value, selector) {
		this.expect(this.find(selector).attributes()[attr]).not.toBe(value)
	}


	find(selector) {
		return this.wrapper.find(selector)
	}

	// input
	type(text, input, event = 'input') {
		const node = this.find(input)
		node.element.value = text
		node.trigger(event)
	}

	inputValueIs(text, selector) {
		this.expect(this.find(selector).element.value).toBe(text)
	}

	inputValueIsNot(text, selector) {
		this.expect(this.find(selector).element.value).not.toBe(text)
	}

	// event
	click(selector) {
		this.find(selector).trigger('click')
	}

	emitted(event) {
		this.expect(this.wrapper.emitted()[event]).toBeTruthy()
	}

	emittedContains(event, ...data) {
		this.emitted(event)
		let elements = this.wrapper.emitted()[event][0]

		data.forEach(element => {
			Array.isArray(element) ? this.checkArray(elements, element) :
				element instanceof Object ? this.checkObject(elements, element) :
				this.checkData(elements, element)


		})
	}

	// Helpers
	checkArray(elements, element) {
		return element.forEach(e => {
			elements.forEach(arr => {
				this.expect(arr).toContain(e)
			})
		})
	}

	checkObject(elements, element) {
		return elements.forEach(obj => {
			this.expect(obj).toEqual(this.expect.objectContaining(element))
		})
	}

	checkData(elements, element) {
		return this.expect(elements).toContain(element)

	}

	// store
	getter(getterName) {
		return this.wrapper.vm.$store.getters[getterName]
	}
}

export default Helpers