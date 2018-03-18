# mwangaben-vthelpers


A package that aim at simplify writing your Vue test.


## Your attention please

### How this package works:

This package depends on vue-test-utils and expect packages.




## Installation


```bash
$ npm install mwangaben-vthelpers
```

## Basic Usage

```Js
import { mount } from 'vue-test-utils';
import expect from 'expect';
import Helpers from  'mwangaben-vthelpers';
import Questions from '../components/Questions.vue';


describe('Questions', () => {
    let wrapper, b;

    beforeEach(() => {
        wrapper = mount(Questions);

        b = new Helpers(wrapper, expect);
    });
```

## Documentation

 Note the instantiation of the Helpers class and the arguments it takes, first is wrapper and second is expect package


```bash
$  b.see(text, selector)
```

```JS
it('it shows the text in h2 tag ', () => {
    b.see('Where am i ?', 'h2');

    //Or anywhere you can find this text
    b.see('Where am i?');

});
```

```bash
$ b.doNotSee(text)
```

```JS
it('it does not show the text node when visibility is hidden', () => {
    b.doNotSee('Header');
})
 ```

```bash
$  b.type(text, selector)
```

```JS
it('it does the typing thing ', () => {
    b.type('Vue test helpers', 'input[name=title]');
});
```

```bash
$  b.click(selector)
```

```JS
it('it does the click thing ', () => {
    b.click('#edit');
});
```

```bash
$  b.inputValueIs(text, selector)
```

```JS
it('does the input value has this text', () => {
    b.type('Vue test helpers', 'input[name=title]');

    b.inputValueIs('Vue test helpers', 'input[name=title]');
});
```


```bash
$  b.inputValueIs(text, selector)
```

```JS
it('does the input value is not this text', () => {
    b.type('Vue test helpers', 'input[name=title]');

    b.inputValueIsNot('Tdd in Vue', 'input[name=title]');
});
```


```bash
$  b.domHas(selector)
```

```JS
it('the wrapper or DOM has this' , () => {
    b.domHas('h2')
});
```

```bash
$  b.domHasNot('selector')
```

```JS
it('the wrapper or DOM does not have this' , () => {
    b.domHasNot('h2')
});
```

```bash
$ b.hidden('selector')
```

```JS
it('it checks if the list is visible', () => {
    b.hidden('ul');
})
```

```bash
$ b.emitted('event')
```

```JS
it('broadcasts event', () => {
    b.emitted('event');
})
```

### All in action

```JS
import {mount} from 'vue-test-utils';
import MockingRequest from '../../resources/assets/js/components/MockingRequest.vue';
import expect from 'expect';
import moxios from 'moxios';
import Helpers from 'mwangaben-vthelpers';


describe('MockingRequest', () => {
    let wrapper, b;

    beforeEach(() => {
        moxios.install();

        wrapper = mount(MockingRequest, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body',
                }
            }
        });

        b = new Helpers(wrapper, expect);
    });

    afterEach(() => {
        moxios.uninstall();
    })

    it('it should have title and body', () => {
        b.see('The title');
        b.see('The body');
    });

    it('it can be edited', () => {
        b.domHasNot('input[name=title]');
        b.domHasNot('textearea[name=body]');

        b.click('.edit');

        b.inputValueIs('The title', 'input[name=title]');
        b.inputValueIs('The body', 'textarea[name=body]');

    });

    it('hides the edit button during editing mode', () => {
        wrapper.find('.edit').trigger('click');
        expect(wrapper.contains('.edit')).toBe(false);
    });

    it('it updates the question when the update is clicked', (done) => {

        b.click('.edit');

        b.see('Update');
        b.see('Cancel');

        b.type('Changed title', 'input[name=title]');
        b.type('Changed body', 'textarea[name=body]');

        b.inputValueIs('Changed title', 'input[name=title]');

        moxios.stubRequest("/questions", {
            status : 200,
            response : {
                title : 'The title',
                body : 'The body'
            }
        });

        b.click('#update');

        b.see('Changed title');
        b.see('Changed body');
        moxios.wait(() => {
            b.see('Your question has been updated');
            done();
        })
    });

    it('it can cancel the editing', () => {
        b.click('.edit');

        b.type('Changed title', 'input[name=title]');

        b.click('.cancel');

        b.see('The title');
    });
});
```




## License

This project is licensed under the [MIT license](http://opensource.org/licenses/MIT).
