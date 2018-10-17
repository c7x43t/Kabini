module.default=class Kabini extends HTMLElement{
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
			this.clone=this.template.content.cloneNode(true);
			//customElements.define(this.tagName.toLowerCase(), this.constructor);
		}
	}
	connectedCallback(){
		this.appendChild(this.clone);
	}
	disconnectedCallback(){
		
	}
	adaptedCallback(){
		
	}
	attributeChangedCallback(){
		
	} 
}	
module.exports=function tagToCamelCase(str){
	return str.toLowerCase()
	.split(/[ -_]+/)
	// turn the first letter to uppercase starting at the second segment
	.map((e,i)=>i>0?e[0].toUpperCase()+e.slice(1,e.length):e)
	.join("");
}