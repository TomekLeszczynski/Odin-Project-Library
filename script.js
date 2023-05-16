const bookTitle = document.querySelector('[name="title"]')
const bookAuthor = document.querySelector('[name="author"]')
const readStatus = document.querySelector('select')
const addBtn = document.querySelector('[type="button"]')
const form = document.querySelector('form')
const itemsList = document.querySelector('.table-items')

let myLibrary = JSON.parse(localStorage.getItem('books')) || []

class Book {
	constructor(title, author, status) {
		this.title = title
		this.author = author
		this.read = status
	}
}
function removeItem(id) {
	const itemToDelete = document.getElementById(`${id}`)
	myLibrary.splice(itemToDelete.id, 1)
	handleStorageAndDisplay()
}
function handleStorageAndDisplay() {
	localStorage.setItem('books', JSON.stringify(myLibrary))
	populateLibrary(myLibrary, itemsList)
}
function toggleStatus(e) {
	if (e.target.classList.contains('read-status')) {
		const index = e.target.parentNode.id
		if (myLibrary[index].read === 'read') {
			myLibrary[index].read = 'not read'
		} else {
			myLibrary[index].read = 'read'
		}
		handleStorageAndDisplay()
	}
}
function addBookToLibrary(e) {
	e.preventDefault()
	if (bookTitle.value === '' || bookAuthor.value === '' || readStatus.value === '') {
		alert(`Please fill the form.`)
		return
	} else {
		const newItem = new Book(bookTitle.value, bookAuthor.value, readStatus.value)
		myLibrary.push(newItem)
		handleStorageAndDisplay()
		form.reset()
	}
}
function populateLibrary(myLibrary, itemsList) {
	itemsList.innerHTML = myLibrary
		.map((book, id) => {
			return `<tr class="table-item" id="${id}">
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td class="read-status">${book.read}</td>
			<td><button class="table-item-button" id="${id}" onclick="removeItem(${id})">delete</button>
			</tr>`
		})
		.join('')
}

populateLibrary(myLibrary, itemsList)

form.addEventListener('submit', addBookToLibrary)
itemsList.addEventListener('click', toggleStatus)
