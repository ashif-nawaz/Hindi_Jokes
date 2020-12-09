let subCategoriesContainer = document.querySelector(".sub-categories");
let modal = document.querySelector(".modal");
let spinner = document.querySelector(".spinner");
let jokePara = document.querySelector(".modal .content p");
let prevBtn = document.querySelector("#prevButton");
let nextBtn = document.querySelector("#nextButton");

let urlForCategories = "";
urlForCategories = " https://gofugly.in/api/categories";

let urlForSubCategories = "";

let urlForContent = "";
urlForContent = " https://gofugly.in/api/content/";

let categoriesId = 0;
let subCategoriesId = 0;
let contentArray = [];

getCategoriesId();
getSubCategoriesId();


onModalClick();

function onModalClick(){
    modal.addEventListener("click", function(e){
               if(e.target == e.currentTarget){
                    this.classList.remove("show");
               }
    }, true);
}

function getCategoriesId(){
    let items = document.querySelectorAll(".item");
    for(let i = 0; i < items.length; i++){
         items[i].addEventListener("click", function(e){
             categoriesId = this.id;
             subCategoriesContainer.classList.toggle("active");
         })
    }
}

function getSubCategoriesId(){
    let subChilds = document.querySelectorAll(".sub-child");

    for(let i = 0; i < subChilds.length; i++){
         subChilds[i].addEventListener("click", function(e){
             subCategoriesId = this.id;
             getData(urlForContent + this.id + "", giveCategories);
             
             modal.classList.add("show");
             jokePara.innerHTML = "";
             spinner.style.display = "block";
             
         })
    }
}


function getData(url, callback){
       
       let xhttp = new XMLHttpRequest();
       xhttp.open("GET", url, true);

       xhttp.onload = function(){
        if(this.status == 200){ 
          callback(this.response);
          spinner.style.display = "none"
        }else{
            alert("Error " + this.statusText);
        }
        
   }

   xhttp.onerror = function(){
       alert("something went wrong");
   }

   
   xhttp.send();

  }


  function giveCategories(resp){
      let p = 0;
       let contentsJsonObj = JSON.parse(resp);

       if(contentsJsonObj.result !== false){

          contentArray = contentsJsonObj.result;
          jokePara.innerHTML = contentArray[p].joke;
 
          nextBtn.addEventListener("click", function(e){
             p++;
             if(p >= contentArray.length){
                 p = 0;
             }
             jokePara.innerHTML = contentArray[p].joke;
          });
 
          prevBtn.addEventListener("click", function(e){
             p--;
             if(p < 0){
               p = contentArray.length - 1;
             }
             jokePara.innerHTML = contentArray[p].joke;
          });

       }else{
           jokePara.innerHTML = "No joke available to show";
       }
      
  }
