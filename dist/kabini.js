(function () {
	'use strict';

	class Kabini extends HTMLElement{
		constructor(){
			// Must call super constructor in derived class before accessing 'this' or returning from derived constructor
			super();
			if(!this.hasOwnProperty("template")){
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
		let index=0,result="";
		var reg=/-+/g,match;
		while(match=reg.exec(str)){
			position=match.index;
	        result+=index===0?str[index]:str[index].toUpperCase()+str.slice(index+1,position);
	        index=position+1;
	    }    result+=(index+1<=str.length?str[index].toUpperCase():"")+str.slice(index+1,str.length);
		return result;
	};

	class ToDo extends Kabini{
		constructor(){
			super();
		}
		
	};
	customElements.define('to-do', ToDo);//, { extends: "ul" });

	window.Kabini=Kabini;

}());
