export const getHTMLBySeletor = function(str,seletor){
	let body = document.createElement('div');
	body.innerHTML = str;
	const dom = body.querySelectorAll(seletor);
	body = null;
	return dom;
}