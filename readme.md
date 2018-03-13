# More-Recipes
![Build Status](https://travis-ci.org/kensanni/More-recipes.svg?branch=develop) [![Coverage Status](https://coveralls.io/repos/github/kensanni/More-recipes/badge.svg?branch=develop)](https://coveralls.io/github/kensanni/More-recipes?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/61935e09f001a06fb347/maintainability)](https://codeclimate.com/github/kensanni/More-recipes/maintainability)


## About
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  

### Features
- Add recipes to catalog
- Modify a recipe
- Delete a recipe
- See all recipes on the catalog
- Upvote or downvote a recipe
- Favorite a recipe
- Review a recipe
- See most popular recipes on the application

  Live demo: [more-recipe-007.herokuapp.com](http://more-recipe-007.herokuapp.com/)
	
## Technologies Used

#### Client side:
     - The client side of this application is built with REACT(Front-end Library) and REDUX(state management)
#### Server side:
     - The server side is built on NODE using EXPRESS(web framework) as the server,
	  SEQUELIZE as the ORM(object Relation Mapper) for communicating with POSTGRESQL DB
	
     - Written in ES6 and transpiled down to ES5 with BABEL

#### Style checking and best pratice
    - ESLINT, which is configured to Airbnb-base rule

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Installation and Dependencies

You can get the app running locally in the following way:
1.  Install NodeJs [`node`](https://nodejs.org/en/download/), version 5 or greater on your machine

2. Install [`postgres`](https://www.postgresql.org/download/) to your local machine

3. Clone the repository and cd into it
   
	  ```
    git clone https://github.com/kensanni/More-recipes.git
    cd More-recipes
    ```
		
 4. Install dependenices 
    
		 npm install
		 
 5. Create a database in progresql
    
		 In the application root directory, check the config.js file in
		 `server/config/config.js` to setup your database
		 
 6. Run database migrations
    
		 sequelize db: migrate

 7.  start the application
 
		 - npm run start:dev
		 - Application would be up and running on localhost 8000
		 
#### Testing

This app uses `Mocha/Chai` and `Chai-Http` for backend testing

 > - `npm run start:test`  - migrate the test database
 > - `npm run test` - run unit test for backend

## Contributing

To contribute make a comment on our issue page. If issue has not been raised yet, feel free to raise an issue and a comment will give you the go ahead to contribute. 

To contribute:
>- Clone the repository.
>- Install dependencies
>- Create a new branch for included feature(s)
>- Raise a pull request.
 

## Author

* **Sanni Kehinde** 
