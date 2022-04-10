export function searchDOMBreadthFirst(root = document.body) {
  const tagType = "UL";

  // breadth first of DOM elements
  // finds the list of problems parent element
  const q: any = [root];
  const ul = [];
  while(q.length){ 
      const el = q.pop();
      el.tagName === tagType ? ul.push(el) :  Array.from(el.children).map((c) => q.push(c)) ;
  }
  const liUrls = ul.map((ulInstance) => {
    return Array.from(ulInstance.children).map((li: HTMLLIElement) => {
      return li.querySelectorAll("a")[0].href;
    });
  });
  console.log({ liUrls });
  return liUrls;
}