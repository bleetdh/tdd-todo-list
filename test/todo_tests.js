const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

var params = {
  name: 'First Todo',
  description: 'First Description',
  completed: false
}
var params2 = {
  name: 'Second Todo',
  description: 'First Description',
  completed: false
}
var params3 = {
  name: 'Only name'
}
var params4 = {
  description: 'error here'
}
var params5 = {
  name: 'four'
}

// normal case: creating new todos
var firstTodo = todos.create(params)
assert.strictEqual(todos.list().length, 1, 'List should have one after create')

// normal case: params contains 3 props
assert.strictEqual(firstTodo.hasOwnProperty('name'), true)

// normal case
// actual firstTodo._id
// expected? true
assert.strictEqual(firstTodo.hasOwnProperty('_id'), true, 'every todo needs to have _id property')

// normal case
// secondTodo._id is unique
var secondTodo = todos.create(params2)
assert.notStrictEqual(secondTodo._id, firstTodo._id, '_id prop needs to be unique')

// normal case
// new todo without name in param, should have default description and completed
var onlyNameTodo = todos.create(params3)
var defaultDescription = 'my todo description'
var defaultCompleted = false
assert.strictEqual(onlyNameTodo.description, defaultDescription, 'Description should be default')
assert.strictEqual(onlyNameTodo.completed, defaultCompleted, 'Completed should be default')

// error case
// cannot create new todo without name property
var noNameTodo = todos.create(params4)
assert.strictEqual(noNameTodo, false, 'Name is required')

// error case
// cannot create new todo with short name
var shortTodo = todos.create(params5)
assert.strictEqual(shortTodo, false, 'Name is too short')

// normal case
// show todo with correct id, returns the todo object
assert.strictEqual(todos.show(firstTodo._id), firstTodo, 'Show doesn\'t return the correct todo object')

// error case
// show false if todo is not found
assert.strictEqual(todos.show('123'), false, 'Show false if todo is not found')
var newParams1 = {
  description: 'new description'
}
var newParams2 = {
  completed: true
}
var newParams3 = {
  name: 'new name'
}
var newParams4 = {
  name: 'four'
}

// normal case
// todos.update() update each params individually
todos.update(secondTodo._id, newParams1)
var updatedSecondTodo = todos.show(secondTodo._id)
assert.strictEqual(updatedSecondTodo.description, 'new description', 'Update doesn\'t update description')
todos.update(secondTodo._id, newParams2)
var updatedSecondTodo = todos.show(secondTodo._id)
assert.strictEqual(updatedSecondTodo.completed, true, 'Update doesn\'t update completed')
todos.update(secondTodo._id, newParams3)
var updatedSecondTodo = todos.show(secondTodo._id)
assert.strictEqual(updatedSecondTodo.name, 'new name', 'Update doesn\'t update name')

// error case
// update name needs to follow name property convention
todos.update(secondTodo._id, newParams4)
assert.strictEqual(todos.update(secondTodo._id, newParams4), false, 'Update should fail if name is too short')

// normal case
// destroy function should remove the object from the array
todos.destroy(firstTodo._id)
assert.strictEqual(todos.show(firstTodo._id), false, 'FirstTodo should not exist after destroying')

// error case
// destroy function should return false if object doesn't exist
assert.strictEqual(todos.destroy(123), false, 'Destroy doesn\'t return false if id is invalid')

// normal case
// destroyAll emptied the todos array
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'Todo list should be empty after destroyAll')


// const assert = require('assert')
// const todos = require('../controllers/todos_controller.js')
//
// // // Use Assert to Test the functionality of all your CRUD methods e.g.
// assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
//
// var params = {
//   name: 'First Todo',
//   description: 'First Description',
//   completed: false
// }
//
// var params2 = {
//   name: 'Second Todo',
//   description: 'First Description',
//   completed: false
// }
//
// var params3 = {
//   name: 'Only name'
// }
//
// var params4 = {
//   description: 'error here'
// }
//
// var params5 = {
//   name: 'four'
// }
//
// // normal case: creating new todos
// var firstTodo = todos.create(params)
// assert.strictEqual(todos.list().length, 1, 'List should have one after create')
//
// // normal case: params contains 3 props
// assert.strictEqual(firstTodo.hasOwnProperty('name'), true)
//
// // normal case
// // actual firstTodo._id
// // expected? true
// assert.strictEqual(firstTodo.hasOwnProperty('_id'), true, 'every todo needs to have _id property')
//
// // normal case
// // secondTodo._id is unique
// var secondTodo = todos.create(params2)
// assert.notStrictEqual(secondTodo._id, firstTodo._id, '_id prop needs to be unique')
//
// // normal case
// // new todo without name in param, should have default description and completed
// var onlyNameTodo = todos.create(params3)
// var defaultDescription = 'my todo description'
// var defaultCompleted = false
//
// assert.strictEqual(onlyNameTodo.description, defaultDescription, 'Description should be default')
//
// assert.strictEqual(onlyNameTodo.completed, defaultCompleted, 'Completed should be default')
//
// // error case
// // cannot create new todo without name property
//
// var noNameTodo = todos.create(params4)
// assert.strictEqual(noNameTodo, false, 'Name is required')
//
// // error case
// // cannot create new todo with short name
// var shortTodo = todos.create(params5)
// assert.strictEqual(shortTodo, false, 'Name is too short')
//
// // normal case
// // return a list of all todos
// assert.strictEqual(todos.list().length, 3, 'List should return an array of all todos')
//
// // #### Show(id)
// // * Should return the Todo Object with the specified `id`
// // * Should return null if no TODO with that `id` exists
//
// // normal case
// // return todo object with the specified 'id'
// var firstParamsID = params._id
// assert.strictEqual(todos.show(firstParamsID), params, 'With this ID, should return the first object')
//
// // error case
// // return null if no such id exists
// var fakeParamsID = 12345
// assert.strictEqual(todos.show(fakeParamsID), null, 'This ID does not exist, should not return anything')
//
// // ### UPDATE
// //
// // #### Update(id, updatedParams)
// // * Should be able to update the Todo with the given id, using the following KVPs (Key-Value Pairs) in the `updatedParams` object:
// //   * `name`
// //   * `description`
// //   * `completed` (true/false)
// // * Should allow individual fields to be updated
// // * Should NOT allow a `name` to be changed to blank or less than 5 characters in length
// // * Should return `true` if an update is successful, `false` if otherwise
//
// // normal case
// // able to update params when inputting correct id
// var firstUpdatedParams = {
//   name: 'Updated Todo',
//   description: 'Updated Description',
//   completed: true
// }
// assert.strictEqual(todos.update(firstParamsID, firstUpdatedParams), true, 'Should return true if params is updated')
//
// // normal case
// // able to update name, desciption, completed
// assert.strictEqual(params.name, firstUpdatedParams.name, 'Should update name property!')
// assert.strictEqual(params.desciption, firstUpdatedParams.desciption, 'Should update desciption property!')
// assert.strictEqual(params.complete, firstUpdatedParams.complete, 'Should update complete property!')
//
// // normal case
// // able to update individual field only
// var onlyNameToUpdate = {
//   name: 'only name updated'
// }
// todos.update(firstParamsID, onlyNameToUpdate)
// assert(params.description, 'Updated Description', 'should not update description')
// console.log(params)
