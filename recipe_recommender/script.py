import json
import requests
import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO
# URL to make the request to
category_url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
specific_cat_url='https://www.themealdb.com/api/json/v1/1/filter.php?a='
food_url="https://www.themealdb.com/api/json/v1/1/lookup.php?i="
# Make the GET request
response = requests.get(category_url)

if response.status_code == 200:
    cat_list_res=response.json()
    category= [x['strArea'] for x in cat_list_res["meals"]]
    print("Available Cuisines:")
    for idx, cuisine in enumerate(category, 1):  # Start enumeration from 1
        print(f"{idx}. {cuisine}")

    # Ask the user to choose a category by number
    choice = int(input("Please select a cuisine by number: "))

    # Get the selected category
    if 1 <= choice <= len(category):
        selected_category = category[choice - 1]  # Adjust for 0-based index
        print(f"You selected: {selected_category}")
    else:
        print("Invalid choice")
        selected_category="Canadian" #default
    food_list_res= requests.get(specific_cat_url+selected_category).json()["meals"]
    print("Select Dish:")
    for idx, food in enumerate(food_list_res, 1):  # Start enumeration from 1
        foodName= food["strMeal"]
        print(f"{idx}. {foodName}")
    choice = int(input("Please select a food by number: "))

    # Get the selected category
    if 1 <= choice <= len(food_list_res):
        selected_food = food_list_res[choice - 1]["strMeal"]  # Adjust for 0-based index
        selected_food_id= food_list_res[choice - 1]["idMeal"]
        print(f"You selected: {selected_food, selected_food_id}")
    else:
        print("Invalid choice")
        selected_food="15-minute chicken & halloumi burgers" #default
        selected_food_id=53085
    selectedFood= requests.get(food_url+selected_food_id).json()["meals"][0]
    print(f"Meal ID: {selectedFood['idMeal']}")
    print(f"Meal Name: {selectedFood['strMeal']}")
    print(f"Category: {selectedFood['strCategory']}")
    print(f"Area: {selectedFood['strArea']}")
    print(f"Instructions:\n{selectedFood['strInstructions']}")

    # Compile ingredients and measures
    ingredients = []
    for i in range(1, 21):
        ingredient = selectedFood.get(f'strIngredient{i}')
        measure = selectedFood.get(f'strMeasure{i}')
        if ingredient and ingredient.strip():
            ingredients.append(f"{measure.strip()} {ingredient.strip()}")

    # Display ingredients
    print("\nIngredients:")
    for item in ingredients:
        print(f"- {item}")

    # Render and display the image
    image_url = selectedFood['strMealThumb']
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))

    # Display the image using Matplotlib
    plt.figure(figsize=(8, 6))
    plt.imshow(img)
    plt.axis('off')
    plt.title(selectedFood['strMeal'])
    plt.show()
    
    
else:
    print(f'Failed to fetch data. Status code: {response.status_code}')
