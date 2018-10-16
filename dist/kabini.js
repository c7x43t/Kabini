(function () {
	'use strict';

	class Kabini extends HTMLElement{
		constructor(){
			// Must call super constructor in derived class before accessing 'this' or returning from derived constructor
			super();
		}
		connectedCallback(){
			
		}
		disconnectedCallback(){
			
		}
		adaptedCallback(){
			
		}
		attributeChangedCallback(){
			
		} 
	};

	class ToDo extends Kabini{
		constructor(){
			
		}
		
	};
	customElements.define('to-do', ToDo);//, { extends: "ul" });

	window.Kabini=Kabini;

}());
