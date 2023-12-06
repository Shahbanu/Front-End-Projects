function retriveAllRecipies(){
    const recipies = [];
    Object.keys(localStorage).forEach(key => {
        let retrivedObj = localStorage.getItem(key);
        recipies.push(JSON.parse(retrivedObj)) ;
      });
      return recipies;
};

function saveRecipe(obj){
    localStorage.setItem(obj.title, JSON.stringify(obj));
};

// GET ALL RECIPIES ON WINDOW LOAD and YEAR FOR FOOTER
const recipiesArray = [];
window.onload = (event) => {
    const dt = new Date();
    const par = document.querySelector("#copy-p");
    par.textContent = `@${dt.getFullYear()} Created by Panagiotis Eleftheriadis`;

    recipiesArray = retriveAllRecipies();
};

// CHECKBOX VALUE CHANGE
const popularCheckbox = document.querySelector("#popular");
popularCheckbox.addEventListener("click", () =>{
    if(popularCheckbox.value === "false"){
        popularCheckbox.setAttribute("value", "true");
    }else{
        popularCheckbox.setAttribute("value", "false");
    }
});

// ADD RECIPE
const addRecipeButton = document.querySelector("#add-recipe-button");

addRecipeButton.addEventListener("click", () => {
    const title = document.querySelector("#title");
    const category = document.querySelector("#category");
    const ingredients = document.querySelector("#ingredients");
    const instructions = document.querySelector("#instructions");
    const popular = document.querySelector("#popular");
    
    const newObj = {
        title: title.value,
        category: category.value.toLowerCase(),
        ingredients: ingredients.value,
        instructons: instructions.value,
        popular: popular.value
    }

    saveRecipe(newObj);
    
    document.querySelector("#home-link").click();
});