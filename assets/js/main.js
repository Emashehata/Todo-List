var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("btnSubmit");
var btnVisit = document.getElementById("btnVisit");
var btnDelete =document.getElementById("btnDelete")
var tbodyContent = document.getElementById("tbodyContent");
var todoContainer;
if(JSON.parse(localStorage.getItem('todoList'))==null){
    todoContainer=[];
}
else{
    todoContainer=JSON.parse(localStorage.getItem('todoList'));
    displayTodo(); 
    
}
var regex={
    siteName:/^[a-z]{3,}$/,
    siteUrl:/^(https:\/\/|http:\/\/)?(www\.)?[a-z]{2,}\.com\/?$/
}
function vaildation(input){
    if(regex[input.id].test(input.value))
    {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else 
    {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

function addTodo(){
    
        if(vaildation(siteName)&&vaildation(siteUrl)){
            if(searchedTodo()){
                Swal.fire({
                    title: "Warning",
                    text: "Sorry, This site name is already exist",
                    icon: "warning"
                  });
            }
            else{
                var todoObj={
                    siteName:siteName.value,
                    siteUrl:siteUrl.value
                  }
                  todoContainer.push(todoObj);
                  localStorage.setItem('todoList',JSON.stringify(todoContainer));
            }
        }
        else 
            {
                Swal.fire({
                    title: `
                    <div class='items d-flex gap-1'>
                     <div class='item item1'></div>
                    <div class='item item2'></div>
                    <div class='item item3'></div>
                    </div><p class='text-black fs-5 mt-3'>Site Name or Url is not valid, Please follow the rules below :</p>`,
                    html: `<ol class="rules list-unstyled">
                        <li>
                          <i class="fa-regular fa-circle-right p-2 text-danger"></i>
                          <span class='text-dark'>Site name must
                          contain at least 3 characters</span>
                        </li>
                        <li>
                          <i class="fa-regular fa-circle-right p-2 text-danger"></i><span class='text-dark'>Site URL must be a
                          valid one</span>
                        </li></ol>`,
                    showCloseButton: true,
                    showCancelButton: false,
                    showConfirmButton: false,
                  });
            }
            
    }

btnSubmit.onclick = function(){
    addTodo();
    clearForm();
    displayTodo();
}
function clearForm(){
        siteName.value=null;
        siteUrl.value=null;
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");
    
}

function displayTodo(){
    var todo='';
    for(var i=0;i<todoContainer.length;i++)
    {
        todo+=`<tr>
            <td>${i+1}</td>
            <td>${todoContainer[i].siteName}</td>
            <td><button class="btnVisit btn bg-mint-green" id="btnVisit"><a target="_blank" class="text-white link-underline link-underline-opacity-0" href="${todoContainer[i].siteUrl}"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
            <td><button class="btnDelete btn btn-danger" id="btnDelete" onclick="deleteTodo(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
          </tr>`
    }
    tbodyContent.innerHTML=todo;

}

function deleteTodo(index){
    todoContainer.splice(index,1);
    localStorage.setItem('todoList',JSON.stringify(todoContainer));
    displayTodo();


}

function searchedTodo() {
    var term = siteName.value.toLowerCase(); 
    for (var i = 0; i < todoContainer.length; i++) {
        if (todoContainer[i].siteName.toLowerCase() === term) {
            return true;  
        }
    }
    return false;  
}



 


// searchProduct.oninput = function(){
//     searchedProduct();
// }
// function searchedProduct(){
//     var term = searchProduct.value;
//     var searchedArr=[];
//     for(var i=0;i<productList.length;i++){
//         if(productList[i].pName.includes(term.toLowerCase()))
//             searchedArr.push(productList[i]);
//     }
//     displayProducts(searchedArr);
    
// }

/************string methods*************** */
// var txt='my name is eman shehata';
// console.log(txt.charAt(0));
// console.log(txt.at(9));
// console.log(txt[10]);
// console.log(txt.slice(3,6));
// console.log(txt.substring(3,6));
// console.log(txt.toLowerCase());
// console.log(txt.toUpperCase());
// console.log(txt.toLocaleLowerCase('en'));
// console.log(txt.concat(' and my jop is nothing'));
// console.log(txt+(' and my jop is nothing'));
// console.log(txt.split());
// console.log(txt.split(" "));
// console.log(txt.split(""));
// console.log(txt.split("eman"));
// console.log(txt.split(" ").join());
// console.log(txt.split(" ").join(" "));
// console.log(txt.includes("eman"));
// console.log(txt.replace('eman','emo'));
// console.log(txt.padEnd(40,'emo'));


/******regular expression***** */
// var x=//;
// var y=new RegExp("");


// var x=/ab/;//====>any string contain 'ab'
// var x=/[abc]/;//any string contain a or b or c or all or two of them
// var x=/[a-z0-9#]/;//ang string contain any char from a to z or from 0 to 9 or #
// var x=/web[a-z0-9#]web/;//web+ any char from []+web
// var x=/web[a-z]{3}web/;// you will write three charchter from a-z
// var x=/web[a-z]{3,5}web/;//the max is 5 and min is 3
// var x=/web[a-z]{0,1}web/;//put nothing or 1
// var x=/web[a-z]{0,}web/;//noting or infinite
// var x=/web(designer|devloper)web/;//write designer or devloper
// var x=/web(designer|devloper){2}web/;//write designer or devloper twice or dsigner and devloper
// var x= /web[^abc]web/;//anything rather than a or b or c (complement if it's in the square practis)

// var x=/01[0152][0-9]{8}/;//pattern for any egypt's number
// this examble is true but if the user enter ===>
// ===> 'emandnsfjks01020768625jdskjfdjk' it will match!!!!!!
// how to solve this??????????????????
// var x=/^01[0152][0-9]{8}$/;// ^ start with   $ end with

//[0-9]== \d
//[0-9a-zA-Z_]==\w
// . ==> anything
// pattern for ipv4 ===>^((1?[0-9]{1,2}|(2)[0-5]{2})\.){3}(1?[0-9]{1,2}|(1,2)[0-5]{2})$
/////******* made by me********* */




// function validateInputs(element){
//     // console.log(element.value,element.id);
    
//     var regex={
//         productName:/^[A-Z][a-z]{3,7}$/,
//         productPrice:/^[1-9][0-9]{1,4}\.[0-9]{1,2}$/,
//         productDesc:/^.{6,}$/,
//         productCategory:/^(mobile|ipad|labtop)$/
//     }
//     if(regex[element.id].test(element.value))
//     {
//         element.classList.add("is-valid");
//         element.classList.remove("is-invalid");
//         element.nextElementSibling.classList.replace('d-block','d-none');
//         return true;
//     }
//     else 
//     {
//         element.classList.add("is-invalid");
//         element.classList.remove("is-valid");
//         element.nextElementSibling.classList.replace('d-none','d-block');
//         return false;
//     }
    
        
// }
