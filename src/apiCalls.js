const ingredients = fetch(
  "http://localhost:3001/api/v1/ingredients"
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((data) => data)
  .catch((err) => console.log(err));

const recipe = fetch(
  "http://localhost:3001/api/v1/recipes"
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((data) => data)
  .catch((err) => console.log(err));

const users = fetch(
  "http://localhost:3001/api/v1/users"
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((data) => data)
  .catch((err) => console.log(err));

export { ingredients, recipe, users };
