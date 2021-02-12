export const getHTMLBySeletor = function(str,seletor){
	if(typeof str!=="string")throw Error("参数应为字符串格式");
	let body = document.createElement('div');
	body.innerHTML = str;
	let dom = body;
	body = null;
	function seletorAll(sel){
		if(typeof sel === 'string'){
			let l = sel.split("|");
			if(l[1]){
				return [...dom.querySelectorAll(l[0])].map(item=>item.getAttribute(l[1]));
			}
			return dom.querySelectorAll(l[0]);
		}else if(typeof sel === 'function'){
			return [seletor(dom)];
		}
	}
	dom.seletor = function(sel){
		console.log(dom,sel,seletorAll(sel)[0])
		return seletorAll(sel)[0];
	}
	dom.seletorAll = function(sel){
		console.log(dom,sel,seletorAll(sel))
		return seletorAll(sel);
	}
	if(!seletor){
		return dom;
	}
	return dom;
}
export default {
	install(Vue){
		Vue.prototype.getHTMLBySeletor = getHTMLBySeletor;
		window.getHTMLBySeletor = getHTMLBySeletor;
	}
}