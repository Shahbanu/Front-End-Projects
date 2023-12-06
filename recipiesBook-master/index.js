// HELPER FUNCTIONS
function retrieveRecipe(title){
    localStorage.getItem(title)
}

function retriveAllRecipies(){
    const recipies = [];
    Object.keys(localStorage).forEach(async key => {
        const retrivedObj = localStorage.getItem(key);
        recipies.push(JSON.parse(retrivedObj)) ;
      });
      return recipies;
}

function deleteRecipe(title) {
    localStorage.removeItem(title)
}

// CREATE DIV FOR RECIPIE AND APPEND IT TO SECTION OF HTML
function builtSectionRecipies(recipe, recipies_section){
    const div = document.createElement("div");
            div.classList.add("recipe-div")

            const h4 = recipe.title;
            const H4 = document.createElement("h4");
            H4.textContent = h4;

            const pCategory = recipe.category;
            const PCategory = document.createElement("p");
            PCategory.textContent = `Category: ${pCategory}`;

            const pIngredients = recipe.ingredients;
            const PIngredients = document.createElement("p");
            PIngredients.textContent = `Ingredients: ${pIngredients}`;

            const pInstructions = recipe.instructons;
            const PInstructions = document.createElement("p");
            PInstructions.textContent = `Instructions: ${pInstructions}`;

            // let editButton = document.createElement("button");
            // editButton.setAttribute("value", recipe.title);
            // editButton.setAttribute("id", "edit-button");
            // editButton.setAttribute("type", "button");
            // editButton.classList.add("btn", "btn-outline-success");
            // editButton.textContent = "EDIT";

            const deleteButton = document.createElement("button");
            deleteButton.setAttribute("value", recipe.title);
            deleteButton.setAttribute("id", "delete-button");
            deleteButton.setAttribute("type", "button");
            deleteButton.classList.add("btn", "btn-outline-danger");
            deleteButton.textContent = "DELETE";

            div.append(H4, PCategory, PIngredients, PInstructions, deleteButton);
            
            recipies_section.appendChild(div)

            // return recipies_section;
}

// GET ALL RECIPIES ON WINDOW LOAD and YEAR FOR FOOTER
let recipiesArray = [];
window.onload = (event) => {
    const dt = new Date();
    const par = document.querySelector("#copy-p");
    par.textContent = `@${dt.getFullYear()} Created by Panagiotis Eleftheriadis`;

    recipiesArray = retriveAllRecipies();
};

// HOME BUTTON AND LOGO CLICK
const logoClick = document.querySelector(".navbar-brand");
const homeClick = document.querySelector(".home-a");

function handleHomeClick(){
    document.querySelector("#recipies-section").style.display = "none";
    document.querySelector("#div-header").style.display = "block";
}

logoClick.addEventListener("click", handleHomeClick);
homeClick.addEventListener("click", handleHomeClick);

// SHOW ALL RECIPIES
const showAllRecipiesButton = document.querySelector("#all-recipies");

showAllRecipiesButton.addEventListener("click", (recipies) => {
    document.querySelector("#div-header").style.display = "none";
    const recipies_section = document.querySelector("#recipies-section");

    while (recipies_section.firstChild) {
        recipies_section.removeChild(recipies_section.firstChild);
    }

    for(let recipe of recipiesArray){
        builtSectionRecipies(recipe, recipies_section);
    }
    
    recipies_section.style.display = "flex";
    recipies_section.classList.add("display-flex");
});

// SHOW POPULAR RECIPIES
const showPopularRecipiesButton = document.querySelector("#popular-recipies");

showPopularRecipiesButton.addEventListener("click", (recipies) => {
    document.querySelector("#div-header").style.display = "none";
    const recipies_section = document.querySelector("#recipies-section");

    while (recipies_section.firstChild) {
        recipies_section.removeChild(recipies_section.firstChild);
    }

    for(let recipe of recipiesArray){
        if(recipe.popular === "true"){
            builtSectionRecipies(recipe, recipies_section);
        }    
    }
    
    recipies_section.style.display = "flex";
    recipies_section.classList.add("display-flex");
});


// EVENT LISTENER FOR DELETE BUTTON IN EACH RECIPIE
document.addEventListener( "click", (event) => {
    const element = event.target;
    if(element.id === "delete-button"){
        let title = element.parentElement.childNodes[0].textContent;
        deleteRecipe(title);
        // element.parentElement.parentElement.parentElement.childNodes[5].childNodes[1].childNodes[1].childNodes[1].click();
        location.reload();
        document.querySelector("#popular-recipies").click();
    }
} );

// EVENT LISTENER FOR EDIT BUTTON IN EACH RECIPIE FOR FUTURE FEATURE WITH REACT
// document.addEventListener( "click", (event) => {
//     let element = event.target;
//     if(element.id === "edit-button"){
//         let title = element.parentElement.childNodes[0].textContent;    
//     }
// } );


// CATEGORIES OF RECIPIES SHOW AND LINK EACH CATEGORY WITH ITS RECIPIES

const categoriesNavLink = document.querySelector(".categories-link");

categoriesNavLink.addEventListener("click", (event) => {
    const categories = [];
    document.querySelector("#div-header").style.display = "none";
    const recipies_section = document.querySelector("#recipies-section");
    recipies_section.style.textAlign = "center";

    while (recipies_section.firstChild) {
        recipies_section.removeChild(recipies_section.firstChild);
    }

    const div = document.createElement("div");
    div.classList.add("recipe-div");
    div.style.textAlign = "center";

    if(recipiesArray.length === 0){
        const H4 = document.createElement("h4");
        H4.textContent = "NO RECIPIES";
        div.appendChild(H4);

        window.alert("You have no recipies in your browser's local storage")
    }else{
        for(let recipe of recipiesArray){
            if(!recipiesArray.includes(recipe.category)){
                categories.push(recipe.category);
                
                const text = recipe.category.toUpperCase();
    
                const a = document.createElement("a");
                a.style.textDecoration = "none";
                a.style.color = "green";
                a.style.cursor = "grab";
                a.setAttribute("id", `${recipe.category}`);
                a.setAttribute("class", "category-a-link");
                a.textContent = text;
    
                const H3 = document.createElement("h3");
                H3.appendChild(a);
    
                div.appendChild(H3);
            }
        }
    }
    
    
    recipies_section.appendChild(div);
    recipies_section.style.display = "flex";
    recipies_section.classList.add("display-flex");
})

// EVENT HANDLER FOR CATEGORY CLICK ON CATEGORIES LIST
document.addEventListener( "click", (event) => {
    const element = event.target;
    if(element.classList[0] === "category-a-link"){
        let category = element.id;

        document.querySelector("#div-header").style.display = "none";
        let recipies_section = document.querySelector("#recipies-section");

        while (recipies_section.firstChild) {
            recipies_section.removeChild(recipies_section.firstChild);
        }
        console.log(recipiesArray.length)
        if(recipiesArray.length === 0){
            const div = document.createElement("div");
            div.classList.add("recipe-div")

            const H4 = document.createElement("h4");
            H4.textContent = "NO RECIPIES";

            recipies_section.appendChild(div);
            window.alert("You have no recipies in your browser's local storage")
        }else{
            for(let recipe of recipiesArray){
                if(recipe.category === category){
                    const div = document.createElement("div");
                    div.classList.add("recipe-div")
    
                    const h4 = recipe.title;
                    const H4 = document.createElement("h4");
                    H4.textContent = h4;
    
                    const pCategory = recipe.category;
                    const PCategory = document.createElement("p");
                    PCategory.textContent = `Category: ${pCategory}`;
    
                    const pIngredients = recipe.ingredients;
                    const PIngredients = document.createElement("p");
                    PIngredients.textContent = `Ingredients: ${pIngredients}`;
    
                    const pInstructions = recipe.instructons;
                    const PInstructions = document.createElement("p");
                    PInstructions.textContent = `Instructions: ${pInstructions}`;
    
                    // let editButton = document.createElement("button");
                    // editButton.setAttribute("value", recipe.title);
                    // editButton.setAttribute("id", "edit-button");
                    // editButton.setAttribute("type", "button");
                    // editButton.classList.add("btn", "btn-outline-success");
                    // editButton.textContent = "EDIT";
    
                    const deleteButton = document.createElement("button");
                    deleteButton.setAttribute("value", recipe.title);
                    deleteButton.setAttribute("id", "delete-button");
                    deleteButton.setAttribute("type", "button");
                    deleteButton.classList.add("btn", "btn-outline-danger");
                    deleteButton.textContent = "DELETE";
                    
    
                    // ADD TWO BUTTONS FOR EDIT AND DELETE RECIPE
    
                    div.append(H4, PCategory, PIngredients, PInstructions, deleteButton);
                    
                    recipies_section.appendChild(div)
                } 
            }
        }

        recipies_section.style.display = "flex";
        recipies_section.classList.add("display-flex");
    }
});

// SEARCH BY CATEGORY
document.addEventListener("click", (event) =>{
    const element = event.target;
    
    if(element.id === "category-search-button"){
        const category = document.querySelector("#category-search-input").value;

        document.querySelector("#div-header").style.display = "none";
        const recipies_section = document.querySelector("#recipies-section");

        while (recipies_section.firstChild) {
            recipies_section.removeChild(recipies_section.firstChild);
        }
        const found = false;
        for(let recipe of recipiesArray){
            if (recipe.category.toUpperCase().includes(category.toUpperCase())){
                builtSectionRecipies(recipe, recipies_section);
                found = true;
            }
        }

        if(!found){
            const div = document.createElement("div");
            div.classList.add("recipe-div")

            const H4 = document.createElement("h4");
            H4.textContent = "NO RECIPIES FOUND";

            div.appendChild(H4);
            recipies_section.appendChild(div);
        }

        recipies_section.style.display = "flex";
        recipies_section.classList.add("display-flex");
        category.value = "";
    }
});

// SEARCH BY INGREDIENTS
document.addEventListener("click", (event) =>{
    const element = event.target;
    
    if(element.id === "ingredients-search-button"){
        const ingredients = document.querySelector("#ingredients-search-input").value;

        document.querySelector("#div-header").style.display = "none";
        const recipies_section = document.querySelector("#recipies-section");

        while (recipies_section.firstChild) {
            recipies_section.removeChild(recipies_section.firstChild);
        }
        const found = false;
        for(let recipe of recipiesArray){
            if (recipe.ingredients.toUpperCase().includes(ingredients.toUpperCase())){
                builtSectionRecipies(recipe, recipies_section);
                found = true;
            }
        }
        if(!found){
            const div = document.createElement("div");
            div.classList.add("recipe-div")

            const H4 = document.createElement("h4");
            H4.textContent = "NO RECIPIES FOUND";

            div.appendChild(H4);
            recipies_section.appendChild(div);
        }

        recipies_section.style.display = "flex";
        recipies_section.classList.add("display-flex");
        ingredients.value = "";
    }
});

// SEARCH BY KEYWORD 
document.addEventListener("click", (event) =>{
    const element = event.target;
    
    if(element.id === "keyword-search-button"){
        event.preventDefault();
        const keyword = document.querySelector("#keyword-search-input").value;

        document.querySelector("#div-header").style.display = "none";
        const recipies_section = document.querySelector("#recipies-section");

        while (recipies_section.firstChild) {
            recipies_section.removeChild(recipies_section.firstChild);
        }

        const found = false;
        for(let recipe of recipiesArray){
            if (recipe.ingredients.concat(recipe.category, recipe.ingredients, recipe.instructons).toUpperCase().includes(keyword.toUpperCase())){
                builtSectionRecipies(recipe, recipies_section);
                found = true;
            }
        }

        if(!found){
            const div = document.createElement("div");
            div.classList.add("recipe-div")

            const H4 = document.createElement("h4");
            H4.textContent = "NO RECIPIES FOUND";

            div.appendChild(H4);
            recipies_section.appendChild(div);
        }
        
        recipies_section.style.display = "flex";
        recipies_section.classList.add("display-flex");
        // keyword.value = "";
    }
});