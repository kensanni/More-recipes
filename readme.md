# More-Recipes [https://kensanni.github.io/More-recipes/template/]
**STATUS**
[![Build Status](https://travis-ci.org/kensanni/More-recipes.svg?branch=develop)![Coverage Status](https://coveralls.io/repos/github/kensanni/More-recipes/badge.svg)](https://coveralls.io/github/kensanni/More-recipes)]

More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a food recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Dependencies
>- Node

#### Installation

You can get the app running locally in the following way:
>- Install NodeJs on your machine
>- Clone the repository $ git clone [https://github.com/kensanni/More-recipes.git]( https://github.com/kensanni/More-recipes.git)
>- Change into the directory $ cd /More-recipes
>- Use $ npm install to install all required dependencies.
>- Start app with $ npm run start:dev

The app will be running at http://localhost:8000

### Features
* Add recipe   to catalog.
* View all recipe in catalog.
* Post a review for recipe.
* Get all recipes based on most voted.

## API
The routes currently specified in the application are as follows:

- **'api/v1/recipes'**
    - **POST** - Creates a new recipe in the catalog

- **'api/v1/recipes/:recipeId'**
    - **PUT** - Enables User to edit or update information about a recipe.
- **'api/v1/recipes'**
    - **GET** - Retrieve all recipes in catalog
- **'api/v1/recipes?sort=upvotes&order=des'**
    - **GET** - Get all recipes based on most voted.
- **'api/v1/recipes/:recipeId/reviews'**
    - **POST** - allows users to post a review for recipe  
- **'api/v1/recipes/:recipeId'**
    - **DETELE** - allows users to delete recipe

#### Technologies and Services

Written in Javascript es6 syntax and nodejs, with the following:
>- Mocha
>- Chai
>- Express

## Contributing

To contribute make a comment on our issue page. If issue has not been raised yet, feel free to raise an issue and a comment will give you the go ahead to contribute. 

To contribute:
>- Clone the repository.
>- Install dependencies
>- Create a new branch for included feature(s)
>- Raise a pull request.


## Author

* **Sanni Kehinde** 
