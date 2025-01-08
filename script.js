// Spoonacular API URL and key (replace with your actual API key)
const apiKey = "8dd267a213ed4b61ab1df8627a491584"; // Replace this with your Spoonacular API key
const apiUrl = "https://api.spoonacular.com/recipes/findByIngredients";

// Function to fetch recipes based on ingredients
function getRecipes() {
  const ingredients = document.getElementById("ingredientInput").value;
  if (ingredients === "") {
    alert("Please enter some ingredients!");
    return;
  }

  const ingredientArray = ingredients
    .split(",")
    .map((item) => item.trim())
    .join(",+");

  // Fetch data from Spoonacular API
  const url = `${apiUrl}?ingredients=${ingredientArray}&number=5&apiKey=${apiKey}`;

  $.get(url, function (data) {
    if (data.length > 0) {
      displayRecipes(data);
    } else {
      document.getElementById("recipeList").innerHTML =
        "<p>No recipes found. Try different ingredients.</p>";
    }
  }).fail(function () {
    alert("An error occurred while fetching recipes. Please try again later.");
  });
}

// Function to display recipes on the page
function displayRecipes(recipes) {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = ""; // Clear previous results

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe");

    const recipeName = document.createElement("h3");
    recipeName.textContent = recipe.title;

    const recipeImage = document.createElement("img");
    recipeImage.src = recipe.image;
    recipeImage.alt = recipe.title;
    recipeImage.style.width = "100%";
    recipeImage.style.borderRadius = "5px";

    const ingredientsList = document.createElement("ul");
    recipe.usedIngredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = ingredient.name;
      ingredientsList.appendChild(ingredientItem);
    });

    const instructionsLink = document.createElement("p");
    const link = document.createElement("a");
    link.href = `https://spoonacular.com/recipes/${recipe.title.replace(
      /\s+/g,
      "-"
    )}-${recipe.id}`;
    link.target = "_blank";
    link.textContent = "View Full Recipe";
    instructionsLink.appendChild(link);

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeName);
    recipeCard.appendChild(ingredientsList);
    recipeCard.appendChild(instructionsLink);

    recipeList.appendChild(recipeCard);
  });
}