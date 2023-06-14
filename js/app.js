document.getElementById('btnAdd').addEventListener('click', addList); // 추가
document.getElementById('btnDelAll').addEventListener('click', delAllElement); // 전체삭제
document.getElementById('btnDelLast').addEventListener('click', delLastElement); // 마지막 요소 삭제
document.getElementById('DeleteSel').addEventListener('click', delSelected); // 선택 삭제

document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    initData()
});

function initData(){
    /*
    var todoList01 = [{id:1,todo:'HTML+CSS 공부하기'},
                      {id:2,todo:'JavaScript 공부하기'},
                      {id:3,todo:'청소하기'}]
    
    window.localStorage.setItem("todoList",JSON.stringify(todoList01))
    */

    var todoList02=JSON.parse(window.localStorage.getItem("todoList"))
    console.log(todoList02)
    if(todoList02==null){
        return
    }
    
    for(var i=0; i<todoList02.length; i++){
        var tr = document.createElement('tr');

        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('class', 'btn-chk');

        var td01 = document.createElement('td');
        td01.appendChild(input);
        tr.appendChild(td01);

        var td02 = document.createElement('td');
        td02.innerHTML = todoList02[i].todo;
        tr.appendChild(td02);

        document.getElementById('listBody').appendChild(tr);
    }

}

// 추가
function addList() {
    var contents = document.querySelector('.text-basic');

    if (!contents.value) {
        alert('enter item.');
        contents.focus();
        return false;
    }

    var tr = document.createElement('tr');

    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('class', 'btn-chk');

    var td01 = document.createElement('td');
    td01.appendChild(input);
    tr.appendChild(td01);

    var td02 = document.createElement('td');
    td02.innerHTML = contents.value;
    tr.appendChild(td02);

    document.getElementById('listBody').appendChild(tr);

    //로컬스토리지에 영구저장
    //1.기존 배열이 있을 경우
    //2.아예 처음 추가일경우

    if( window.localStorage.getItem("todoList") === null){
        var todoList=[]
        todoList.push({id:1,todo:contents.value})
        window.localStorage.setItem("todoList",JSON.stringify(todoList))
    }else{
        var todoList=JSON.parse(window.localStorage.getItem("todoList"))
        console.log(todoList)
        var nextId = todoList.length+1
        todoList.push({id:nextId,todo:contents.value})
        console.log(todoList)
        window.localStorage.setItem("todoList",JSON.stringify(todoList))
    }

    contents.value = '';

    contents.focus();
}

// 전체삭제
function delAllElement() {
    var list = document.getElementById('listBody');
    var listChild = list.children;

    for (var i = 0; i < listChild.length; i++) {
        list.removeChild(listChild[i])
        i--;
    }

    window.localStorage.removeItem("todoList")
}

// 마지막 항목 삭제
function delLastElement() {
    var body = document.getElementById('listBody');
    var list = document.querySelectorAll('#listBody > tr');

    if (list.length > 0) {
        var liLen = list.length - 1;
        body.removeChild(list[liLen]);

        var todoList=JSON.parse(window.localStorage.getItem("todoList"))
        console.log(todoList)
        todoList.pop()
        window.localStorage.setItem("todoList",JSON.stringify(todoList))

    } else {
        alert('삭제할 항목이 없습니다.')
        return false;
    }
}

// 선택 삭제
function delSelected() {
    var body = document.getElementById('listBody');
    var chkbox = document.querySelectorAll('#listBody .btn-chk');

    var todoList=JSON.parse(window.localStorage.getItem("todoList"))
    console.log(todoList)
        
    

    for (var i in chkbox) {
        if (chkbox[i].checked == true) {
            body.removeChild(chkbox[i].parentNode.parentNode);
            todoList.splice(i,1)
            window.localStorage.setItem("todoList",JSON.stringify(todoList))
        }
    }
}
