const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  var {name, description, completed} = params
  if (!name) return false // check if name is undefined
  if (name.length < 5) return false // check name length

  params._id = uuidGenerator()

  if (!description || !completed) {
    params.description = 'my todo description'
    params.completed = false
  }

  todos.push(params)
  return todos[todos.length - 1]
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}

function show (id) {
  // find the TODO with this id
  var searchedTodo = todos.filter(function (todo) {
    return todo._id === id
  })

  return searchedTodo[0] ? searchedTodo[0] : false
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var updatingTodo = show(id)
  var {name, description, completed} = params

  console.log('before update', updatingTodo)

  // check if blank or less than 5 if name exist in updatedParams
  if (name) {
    if (!name) return false // check if name is undefined
    if (name.length < 5) return false // check name length

    updatingTodo.name = name
  } else {
    name = updatingTodo.name
  }

  if (description) {
    updatingTodo.description = description
  }

  if (completed) {
    updatingTodo.completed = completed
  }

  // console.log('after update', updatingTodo, params)

  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var deletingIndex = todos.findIndex(function (todo) {
    return todo._id === id
  })

  if (deletingIndex === -1) return false

  todos.splice(deletingIndex, 1)
  return true
}

function destroyAll () {
  todos.splice(0)
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
