var str=`abcd{"qwerwqer"}qwerqrabcd{"qwerwqer"}qwerqrabcd`;
var split=str.split(/[{}]/);
var arr=[];
var args=[];
for(let i=0;i<split.length;i++)i%2?args.push(split[i]):arr.push(split[i])
arr.raw=arr;
//producing the same as console.log`abcd${"qwerwqer"}qwerqrabcd${"qwerwqer"}qwerqrabcd`
//invocation: console.log(arr,...args)