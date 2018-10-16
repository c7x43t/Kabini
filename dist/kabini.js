(function () {
	'use strict';

	class Kabini extends HTMLElement{
		constructor(){
			// Must call super constructor in derived class before accessing 'this' or returning from derived constructor
			super();
			// autoload template
			if(!this.hasOwnProperty("template")){
				let template=document.querySelector("template#"+tagToCamelCase(this.tagName));
				this.template=template;
			}
			//
			if(this.template){
				console.log("this is never called");
				customElements.define(this.tagName.toLowerCase(), this.constructor);
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
