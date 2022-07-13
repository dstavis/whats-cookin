import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
    it('Should be a function', () => {
      expect(Recipe).to.be.a('function');
    });

let recipe1;
let recipe2;
let recipe3; 
let recipe4;   

 beforeEach(() => {
recipe1 = new Recipe({id: 1, name: 'Chocolate Chip Cookie', image:'https://recipe-image-1.jpg', portions: [{ ingredientId: 1, name: 'Flour',  amount: 2, cost: 101, unit: 'C'}], instructions: ['Bake it'], tags: ['snack', 'dessert']});

recipe2 = new Recipe({id: 2, name: 'Ham Sandwich', image:'https://recipe-image-2.jpg', portions: [{ingredientId: 2, name: 'Bread', amount: 5, cost: 200,  unit: 'loaf'}], instructions: ['Make Sandwich'],  tags: ['snack', 'lunch']});

recipe3 = new Recipe({id: 3, name: 'Glazed Chops', image:'https://recipe-image-3.jpg', portions: [{ingredientId: 3, name: 'Pork Chop', amount: 1, cost: 300, unit: 'serving'}], instructions: ['Grill it up'],  tags: ['pork', 'dinner']});

recipe4 = new Recipe({id: 4, name: 'Thai Chicken Noodles', image:'https://recipe-image-4.jpg', portions: [{ingredientId: 4, name: 'Chicken', amount: 1, cost: 423, unit: 'each'}, {ingredientId: 5, name: 'Curry', amount: 2, cost: 500, unit: 'Cup'} ], instructions: ['Saute it', 'Simmer it, Eat it'],  tags: ['Chicken', 'Spicy']});

 });

    it('the constructor should have an id number', () => {
    // expect the id to be a 'number'
    expect(recipe1.id).to.equal(1);
    expect(recipe2.id).to.equal(2);
    
  }); 

    it('the constructor should contain a recipe name', () => {
    
    expect(recipe1.name).to.equal('Chocolate Chip Cookie');
    expect(recipe2.name).to.equal('Ham Sandwich');

});

    it('the constructor should contain a recipe image', () => {
    // expect the recipeData.image to be a 'string'
    expect(recipe1.image).to.equal('https://recipe-image-1.jpg');
    expect(recipe2.image).to.equal('https://recipe-image-2.jpg');

});

it('the constructor should have list of ingredients needed', () => {

    // expect recipe.portions to be an 'array'
    expect(recipe3.portions).to.deep.equal([{ingredientId: 3, name: 'Pork Chop', amount: 1, cost: 300, unit: 'serving'}])

    expect(recipe3.portions.length).to.equal(1);
    expect(recipe3.portions[0].name).to.equal('Pork Chop');

    expect(recipe2.portions.length).to.equal(1);
    expect(recipe1.portions[0].name).to.deep.equal('Flour');
    

});

it('the constructor should contain instructions to make a recipe', () => {

    // expect instructions[0] to equal ('SPECIFIC STRING HERE')
    expect(recipe1.instructions[0]).to.equal('Bake it');
    expect(recipe2.instructions[0]).to.equal('Make Sandwich');

});

  it('should have a list of tags', () => {
    // expect the reciep1.tags[0] to deep equal('snack')

    expect(recipe2.tags).to.deep.equal(['snack', 'lunch']);
    expect(recipe2.tags).to.have.lengthOf(2);
  });

  it('should be able to show the names of ingredients needed', () => {
    // is a method test
    //showIngredientsNeeded();
    expect(recipe1.showIngredientsNeeded().length).to.equal(1)
    expect(recipe1.showIngredientsNeeded()[0]).to.equal('Flour');

    expect(recipe2.showIngredientsNeeded()[0]).to.equal('Bread');

  });

  it('should be able to calculate the total cost of ingredients', () => {
    // is a method test
    //calcTotalIngredientCost()

    // recipe1.calcTotalIngredientCost(2, 101);

    expect(recipe1.calcTotalIngredientCost(2, 100)[0]).to.equal(2.02);
  });

  it('should be able to calculate the total cost of a recipe', () => {
    // is a method test
    // calcRecipeCost()


    expect(recipe1.calcRecipeCost()).to.equal(2.02);


    expect(recipe4.calcRecipeCost()).to.equal(14.23);


    
  });

  it('should be return the recipe instructions', () => {

    expect(recipe4.returnRecipeSteps()).to.deep.equal(['Saute it', 'Simmer it, Eat it'])
  });

});
