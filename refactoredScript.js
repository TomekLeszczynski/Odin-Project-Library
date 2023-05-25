class Book {
	constructor(title, author, status) {
		this.title = title
		this.author = author
		this.read = status
	}
}

class LibraryManager {
	constructor() {
		this.library = JSON.parse(localStorage.getItem('books')) || []
	}

	// storage & update

	addBook(title, author, status) {
		const book = new Book(title, author, status)
		this.library.push(book)
		this.saveBookToLocalStorage()
		this.populateLibrary()
	}

	removeBook(index) {
		this.library.splice(index, 1)
		this.saveBookToLocalStorage()
		this.populateLibrary()
	}

	toggleStatus(index) {
		const book = this.library[index]
		book.read === 'read' ? (book.read = 'not read') : (book.read = 'read')
		this.saveBookToLocalStorage()
		this.populateLibrary()
	}

	saveBookToLocalStorage() {
		localStorage.setItem('books', JSON.stringify(this.library))
	}

	//  display

	populateLibrary() {
		document.querySelector('.table-items').innerHTML = this.library
			.map((book, id) => {
				return `<tr class="table-item" id="${id}">
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td class="read-status">${book.read}</td>
			<td><button class="table-item-button" id="${id}">delete</button>
			</tr>`
			})
			.join('')
	}
}

// class instance

const myLibrary = new LibraryManager()
myLibrary.populateLibrary()

//  adding new book function

function handleLibrary(e) {
	e.preventDefault()
	let title = document.querySelector('[name="title"]').value
	let author = document.querySelector('[name="author"]').value
	let status = document.querySelector('select').value
	if (title && author && status) {
		myLibrary.addBook(title, author, status)
		document.querySelector('form').reset()
	} else {
		alert(`Please fill the form.`)
		return
	}
}

// event listeners:

// listen for status toggling

document.addEventListener('click', e => {
	if (e.target.classList.contains('read-status')) {
		let index = e.target.parentNode.id
		myLibrary.toggleStatus(index)
	}
})
// listen for book removing

document.addEventListener('click', e => {
	if (e.target.classList.contains('table-item-button')) {
		let index = e.target.id
		myLibrary.removeBook(index, 1)
	}
})

// listen for adding new book

document.querySelector('form').addEventListener('submit', handleLibrary)
