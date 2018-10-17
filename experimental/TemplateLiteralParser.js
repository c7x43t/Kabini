// this creates a parser similar to how templateLiterals `` are parsed when passed to a function.
// returning an array of 2 arrays, [brackets,strings] matching string1,bracket1,string2,bracket2, ...
// of the original string
function TemplateLiteralParser(opening,closing,escape){
	const reg=new RegExp(`(?:[^${escape}])?${opening}([\\s\\S]+?(?:[^${escape}]|\\0))${closing}`,"g");
	return function templateLiteralParser(str){
		// original working regex for {,} and \
		// /(?:[^\\])??{([\s\S]+?(?:[^\\]|\0))}/g;
		reg.lastIndex=0;
		const strings=[];
		const brackets=[];
		let index=0;
		let prefixEndIndex;
		while(match=reg.exec(str)){
			// string before opening bracket starts at index
			// ends at match.index + can catch a whitespace so add that too
			prefixEndIndex=match.index+match[0].indexOf("{");
			strings.push(str.slice(index,prefixEndIndex));
			brackets.push(match[1]);
			// moving the index behind the closing bracket
			index=reg.lastIndex;
		}
		if(str.length>index){
			strings.push(str.slice(index,str.length))
		}
		brackets.raw=brackets;
		return [brackets,strings];
	}
}
// this will matches brackets { and } with \ beeing the escape charater that prevents matching
var templateLiteralParser=new TemplateLiteralParser("{","}","\\\\")