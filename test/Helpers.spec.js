import {mount} from 'vue-test-utils';
import Questions from '../components/Questions.vue';
import expect from 'expect';
import Helpers from  '../index.js';


describe('Questions', () => {
       let wrapper, b;

     beforeEach(() => {
        wrapper = mount(Questions);

        b = new Helpers(wrapper, expect);
     });

	it('it tests see(text, selector)  method with selector', () => {
	    b.see('Where am i ?', 'h2');
	});

	it('it tests the see(text) method without selector', () => {
		b.see('Where am i ?');
	});

	it('it test the type(text, input) method', () => {
		b.type('Vue test helpers', 'input[name=title]');
		expect(wrapper.find('input[name=title]').element.value).toBe('Vue test helpers'); 
	});

	it('it tests the click(selector) method', () => {
		b.click('.edit');

		b.see('Update');
		b.see('Cancel');
  });

  it('test emitted(event)', () => {
    b.click('.edit');
    b.emitted('isEditing');
  })

	it('it test inputValueIs(text, selector)', () => {
		b.type('Vue test helpers', 'input[name=title]');
		
		b.inputValueIs('Vue test helpers', 'input[name=title]');
	});	

	it('it tests inputValueIsNot(text, selector)', () => {
		b.type('Vue test helpers', 'input[name=title]');
		
		b.inputValueIsNot('V', 'input[name=title]');
	});

	it('it checks domHas(selector)', () => {
		b.domHas('h2')
	});

	it('it checks domHasNot(selector) method', () => {
		b.domHasNot('h1')
	});

	it('it checks domHasNot(selector) method', () => {
		b.domHasNot('Mwangaben')
	});
	it('it ckecks if is hidden ', () => {
	    b.hidden('ul')
	    // b.see('Hidden', 'li')
	});

	it('i do not see', () => {
		b.doNotSee('Hello');	
	});




	
});