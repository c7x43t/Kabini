(function () {
	'use strict';

	class Kabini extends HTMLElement{
		constructor(){
			// Must call super constructor in derived class before accessing 'this' or returning from derived constructor
			super();
			if(!this.hasOwnProperty("template")){
				console.log(this.tagName);
				let template=document.querySelector("tempalte#"+tagToCamelCase(this.tagName));
				console.log(template); 
			}
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
	function tagToCamelCase(str){
		return str.toLowerCase()
		.split("-")
		// turn the first letter to uppercase starting at the second segment
		.map((e,i)=>i>0?e[0].toUpperCase()+e.slice(1,e.length):e)
		.join("");
	};

	class ToDo extends Kabini{
		constructor(){
			super();
		}
		
	};
	customElements.define('to-do', ToDo);//, { extends: "ul" });

	// sometimes i feel like compiler is ignoring my comments
	window.Kabini=Kabini;

}());
