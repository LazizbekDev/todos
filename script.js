"use strict";
const form = document.querySelector('#new-item-form')
const list = document.querySelector('#list')
const input = document.querySelector('#item-input')
const template = document.querySelector('#list-item-template')
const prefix = 'LOCOL_ITEM'
const storage_key = `${prefix}-todos`
let todos = getTodos()

import openModal from './modal.js'

todos.forEach(todo => render(todo))

list.addEventListener('change', (e) => {
    if (!e.target.matches('[data-list-item-checkbox]')) return

    const parent = e.target.closest('#list-item')
    const todoId = parent.dataset.todoId;
    const todo = todos.find((t) => t.id === todoId)
    todo.complate = e.target.checked;
    saveTodo()
})

list.addEventListener('click', (e) => {
    if (!e.target.matches('[data-list-item-delete]')) return

    const parent = e.target.closest('#list-item');
    const todoId = parent.dataset.todoId;
    openModal()
    parent.remove()
    todos = todos.filter((t) => t.id !== todoId);
    saveTodo()
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputvalue = input.value;
    if (inputvalue === '') return
    const newTodo = {
        name: inputvalue,
        complate: false,
        id: new Date().valueOf().toString()
    }
    render(newTodo)
    todos.push(newTodo)
    saveTodo()
    input.value = ""
})

function render (name) {
    const cloned = template.content.cloneNode(true);
    const listItem = cloned.querySelector('#list-item');
    listItem.dataset.todoId = name.id
    const textElement = cloned.querySelector('[data-list-item-text]');
    textElement.innerText = name.name;
    const checkbox = cloned.querySelector('[data-list-item-checkbox]');
    checkbox.checked = name.complate
    list.appendChild(cloned)
}

function getTodos () {
    const allTodos = localStorage.getItem(storage_key);
    return JSON.parse(allTodos) || []
}

const saveTodo = () => {
    localStorage.setItem(storage_key, JSON.stringify(todos))
}

// const buttons = document.querySelectorAll('button');

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         const currentNum = parseInt(button.dataset.clicks)
//         const foo = button.dataset.clicks = currentNum +1
//         button.innerHTML = "<h2>" + foo
//     })
// })