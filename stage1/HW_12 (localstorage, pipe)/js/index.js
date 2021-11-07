function visitLink(path) {
   if (!localStorage.getItem(path)) {
       localStorage.setItem(path, '1');
   }else if (localStorage.getItem(path)) {
       let step = Number(localStorage.getItem(path));
       step++
       localStorage.setItem(path, String(step));
   }
}

function viewResults() {
    let page1 = localStorage.getItem('Page1'),
        page2 = localStorage.getItem('Page2'),
        page3 = localStorage.getItem('Page3');
    let contentBlock = document.querySelector('#content')
    let div = document.createElement('div');
    let arr = [page1, page2, page3];
    let resultList = '<ul>';

    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            resultList += `<li>You visited Page${i+1} ${arr[i]} time(s)</li>`;
        }
    }

    resultList += '</ul>';
    div.innerHTML = resultList;
    contentBlock.append(div)
    localStorage.clear()
}
