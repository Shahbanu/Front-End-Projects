export function saveRecipe(obj){
    localStorage.setItem(obj.title, JSON.stringify(obj));
}

export function retrieveRecipe(title){
    localStorage.getItem(title)
}


export function retriveAllRecipies(){
    let recipies = {};
    Object.keys(localStorage).forEach(key => {
        let retrivedObj = localStorage.getItem(key);
        recipies[key] = JSON.parse(retrivedObj);
      });
      return recipies;
}

export function deleteRecipe(title) {
    localStorage.removeItem(title)
}


//DEMO DATA

// let cookie = {
//     title: "cookie",
//     category: "sugar",
//     ingredients: ["chocolate", "sugar", "biscuit"],
//     instructons: "blahjlsdhaf lasfa;sjfpoieaw  wajfpoewajfpoawe weapfjkpoawe",
//     popular: true
// }
// let macAndCheese = {
//     title: "macAndCheese",
//     category: "pasta",
//     ingredients: ["chocolate", "sugar", "biscuit"],
//     instructons: "blahjlsdhaf lasfa;sjfpoieaw  wajfpoewajfpoawe weapfjkpoawe",
//     popular: false
// }
// let burger = {
//     title: "burgere",
//     category: "fast food",
//     ingredients: ["chocolate", "sugar", "biscuit"],
//     instructons: "blahjlsdhaf lasfa;sjfpoieaw  wajfpoewajfpoawe weapfjkpoawe",
//     popular: false
// }
//  let crepa = {
//         title: "crepa",
//         category: "sugar",
//         ingredients: ["chocolate", "sugar", "biscuit"],
//         instructons: "blahjlsdhaf lasfa;sjfpoieaw  wajfpoewajfpoawe weapfjkpoawe",
//         popular: true
// }
// localStorage.setItem(crepa.title, JSON.stringify(crepa));
// localStorage.setItem(cookie.title, JSON.stringify(cookie));
// localStorage.setItem(macAndCheese.title, JSON.stringify(macAndCheese));
// localStorage.setItem(burger.title, JSON.stringify(burger));