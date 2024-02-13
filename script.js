const form = document.querySelector('form');
const magnifier = document.querySelector('.magnifier');
const container = document.querySelector('.container');
const input = document.querySelector('.input');
const title = document.querySelector('.title');
const img = document.querySelector('.img');
const info = document.querySelector('.info');
const ingredientsOutput = document.querySelector('.ingredientsOutput');

const searchMeal = async (e) => {
    e.preventDefault();

    const val = input.value.trim();

    const showMealInfo = (meal) => {
        console.log(meal);
        // Here you can update the UI with the meal data
        const { strMeal, strMealThumb, strInstructions, ...ingredientsObj } = meal;
        title.textContent = strMeal;
        img.style.backgroundImage = `url(${strMealThumb})`;
        info.innerHTML = strInstructions.replace(/\n/g, '<br>');

        // Update ingredients
        let ingredientsContent = '';

        // Iterate over ingredients and measurements
        for (let i = 1; i <= 20; i++) {
            const ingredient = ingredientsObj[`strIngredient${i}`];
            const measure = ingredientsObj[`strMeasure${i}`];
            if (ingredient) {
                ingredientsContent += `${measure} ${ingredient}<br>`;
            } else {
                break; // Stop iterating if no more ingredients
            }
        }

        const ingredientsHeading = ingredientsOutput.querySelector('.ingredientsHeading');
        const ingredientsText = ingredientsOutput.querySelector('.ingredients-text');
        ingredientsText.innerHTML = ingredientsContent;
        ingredientsOutput.classList.remove('hidden');

        // Show container
        container.classList.remove('hidden');
    }

    const getData = async (val) => {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
        const { meals } = await res.json();
        return meals;
    }

    if (val) {
        const meals = await getData(val);

        if (!meals) {
            alert('Meal not found 😫');
            return;
        }

        meals.forEach(showMealInfo)

    } else {
        alert('Please enter a meal name');
    }
}

form.addEventListener('submit', searchMeal);
magnifier.addEventListener('click', searchMeal);


// Update year

const year = document.querySelector('#year');

const updateYear = () => {

    year.textContent = new Date().getFullYear();
}



console.log(updateYear());