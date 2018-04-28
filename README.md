# mwangaben-vthelpers [![Build Status](https://travis-ci.org/mwangaben/mwangaben-vthelpers.svg?branch=master)](https://travis-ci.org/mwangaben/mwangaben-vthelpers)


A package that aim at simplify writing your Vue test.


## Your attention please

### How this package works:

This package depends on vue-test-utils and expect (if you don't use jest) packages.


## Installation


```bash
$ npm install mwangaben-vthelpers --save-dev
```

## Basic Usage

<!-- eslint-disable no-undef, no-unused-vars -->
```js
import expect from 'expect' // no needed if you already use jest
import Helpers from 'mwangaben-vthelpers'
import { mount } from 'vue-test-utils'
import Questions from '../components/Questions.vue'

describe('Questions', () => {
  let wrapper, b

  beforeEach(() => {
    wrapper = mount(Questions)

    b = new Helpers(wrapper, expect)
  })

  // ...
})
```

## Documentation

 Note the instantiation of the Helpers class and the arguments it takes, first is wrapper and second is expect package


* `b.see(text, selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('it shows the text in h2 tag ', () => {
    b.see('Where am i ?', 'h2')

    // Or anywhere you can find this text
    b.see('Where am i?')
  })
  ```

* `b.doNotSee(text)`
  <!-- eslint-disable no-undef -->
  ```js
  it('it does not show the text node when visibility is hidden', () => {
    b.doNotSee('Header')
  })
  ```

* `b.type(text, selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('it does the typing thing ', () => {
    b.type('Vue test helpers', 'input[name=title]')
  })
  ```

* `b.click(selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('it does the click thing ', () => {
    b.click('#edit')
  })
  ```

* `b.inputValueIs(text, selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('does the input value has this text', () => {
    b.type('Vue test helpers', 'input[name=title]')

    b.inputValueIs('Vue test helpers', 'input[name=title]')
  })
  ```

* `b.inputValueIs(text, selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('does the input value is not this text', () => {
    b.type('Vue test helpers', 'input[name=title]')

    b.inputValueIsNot('Tdd in Vue', 'input[name=title]')
  })
  ```

* `b.domHas(selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('the wrapper or DOM has this', () => {
    b.domHas('h2')
  })
  ```

* `b.domHasNot(selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('the wrapper or DOM does not have this', () => {
    b.domHasNot('h2')
  })
  ```

* `b.hidden(selector)`
  <!-- eslint-disable no-undef -->
  ```js
  it('it checks if the list is visible', () => {
    b.hidden('ul')
  })
  ```

* `b.emitted(event)`
  <!-- eslint-disable no-undef -->
  ```js
  it('broadcasts event', () => {
    b.emitted('event')
  })
  ```

### All in action

<!-- eslint-disable no-undef -->
```js
import expect from 'expect'
import moxios from 'moxios'
import Helpers from 'mwangaben-vthelpers'
import { mount } from 'vue-test-utils'
import MockingRequest from '../../resources/assets/js/components/MockingRequest.vue'

describe('MockingRequest', () => {
  let wrapper, b

  beforeEach(() => {
    moxios.install()

    wrapper = mount(MockingRequest, {
      propsData: {
        dataQuestion: {
          title: 'The title',
          body: 'The body'
        }
      }
    })

    b = new Helpers(wrapper, expect)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('it should have title and body', () => {
    b.see('The title')
    b.see('The body')
  })

  it('it can be edited', () => {
    b.domHasNot('input[name=title]')
    b.domHasNot('textearea[name=body]')

    b.click('.edit')

    b.inputValueIs('The title', 'input[name=title]')
    b.inputValueIs('The body', 'textarea[name=body]')
  })

  it('hides the edit button during editing mode', () => {
    wrapper.find('.edit').trigger('click')
    expect(wrapper.contains('.edit')).toBe(false)
  })

  it('it updates the question when the update is clicked', (done) => {
    b.click('.edit')

    b.see('Update')
    b.see('Cancel')

    b.type('Changed title', 'input[name=title]')
    b.type('Changed body', 'textarea[name=body]')

    b.inputValueIs('Changed title', 'input[name=title]')

    moxios.stubRequest('/questions', {
      status: 200,
      response: {
        title: 'The title',
        body: 'The body'
      }
    })

    b.click('#update')

    b.see('Changed title')
    b.see('Changed body')
    moxios.wait(() => {
      b.see('Your question has been updated')
      done()
    })
  })

  it('it can cancel the editing', () => {
    b.click('.edit')

    b.type('Changed title', 'input[name=title]')

    b.click('.cancel')

    b.see('The title')
  })
})
```


## License

This project is licensed under the [MIT license](http://opensource.org/licenses/MIT).
