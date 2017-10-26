const db = [];

db.recipes = [
  {
    id: 1,
    userId: 1,
    Name: 'Pounded Yam',
    mealType: 'Lunch',
    description: 'simple dish',
    upvotes: 30,
    downvotes: 4,
  },
  {
    id: 2,
    userId: 3,
    name: 'Jollof rice',
    mealType: 'Lunch',
    description: 'simple dish',
    ingredients: ['rice', 'pepper', 'water'],
    upvotes: 1,
    downvotes: 40,
  },
];

db.review = [
  {
    id: 1,
    recipeId: 1,
    review: "It's so so delicious",
  },
  {
    id: 2,
    recipeId: 2,
    review: 'not tasty',
  },
];
