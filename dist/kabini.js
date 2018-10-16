(function () {
	'use strict';

	class Kabini extends HTMLElement{
		constructor(){
			
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
