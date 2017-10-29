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
    reviews: []
  },
  {
    id: 2,
    userId: 3,
    name: 'Jollof rice',
    mealType: 'Lunch',
    description: 'simple dish',
    upvotes: 1,
    downvotes: 40,
    reviews: []
  },
  {
    id: 3,
    userId: 3,
    name: 'Jollof rice',
    mealType: 'Lunch',
    description: 'simple dish',
    upvotes: 1,
    downvotes: 40,
    reviews: []
  },
  {
    id: 4,
    userId: 3,
    name: 'Jollof rice',
    mealType: 'Lunch',
    description: 'simple dish',
    upvotes: 1,
    downvotes: 40,
    reviews: []
  },
  {
    id: 5,
    userId: 3,
    name: 'Jollof rice',
    mealType: 'Lunch',
    description: 'simple dish',
    upvotes: 1,
    downvotes: 40,
    reviews: []
  },
  {
    id: 6,
    userId: 3,
    name: 'Jollof rice',
    mealType: 'Lunch',
    description: 'simple dish',
    upvotes: 1,
    downvotes: 40,
    reviews: []
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

export default db;
