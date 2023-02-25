const loadFood=(searchText)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(res=>res.json())
    .then(data=>displayMeals(data.meals))
}

const displayMeals=meals=>{
    const mealsContainer=document.getElementById("meals-container");
    mealsContainer.innerHTML="";
    meals.forEach(meal => {
        const mealDiv=document.createElement("div");
        mealDiv.innerHTML=`
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row g-0 d-flex align-items-center">
            <div class="col-md-4">
              <img src="${meal.strMealThumb}" class="img-fluid rounded-2" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">There are many variations of passages of available, but the majority have suffered</p>
                <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#meal-details">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        `;
        mealsContainer.appendChild(mealDiv);
    });
}


const searchMeal=()=>{
    const searchText=document.getElementById("input-field").value;
    loadFood(searchText);
}

const loadMealDetails=idMeal=>{
  const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMealDetails(data.meals[0]))
}

const displayMealDetails=meal=>{
  console.log(meal);
  const list1=document.createElement("li");
  list1.innerText=`Category: ${meal.strCategory}`;
  const list2=document.createElement("li");
  list2.innerText=`Area: ${meal.strArea}`;
  const list3=document.createElement("li");
  list3.innerText=`Instruction: ${meal.strInstructions}`;
  const list4=document.createElement("li");
  list4.innerText=`YouTube: ${meal.strYoutube}`;
  const text=document.getElementById("exampleModalLabel");
  text.appendChild(list1);
  text.appendChild(list2);
  text.appendChild(list3);
  text.appendChild(list4);
  // load the image to meal-image
  const mealImage=document.getElementById("meal-image");
  mealImage.src=meal.strMealThumb;
}

loadFood("chicken");