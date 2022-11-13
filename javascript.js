let myLibrary = [];

function Book(title, author, pages, read) {
    // constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? 'read' : 'not read';
}

const book1 = new Book('Lord of the Rings', 'J. R. Tolkien', '823', true);
const book2 = new Book('Zwiadowcy', 'J. Flanagan', '234', true);
const book3 = new Book('Zwiadowcy II', 'J. Flanagan', '224', false);

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log('book has been added to the shelf');
}

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

// Page display

const main = document.querySelector('.shelf');
const util = document.querySelector('.util');

function displayBooks(library) {
    for (let i = 0; i < library.length; i++) {
        if (library[i]==undefined){
            console.log(`${i} if went in`)
            continue
        }
        const card = document.createElement('div')
        card.classList.add('card');
        for (attribute in library[i]) {
            const container = document.createElement('p');
            container.textContent = `${attribute}: ${library[i][`${attribute}`]}`;
            card.appendChild(container);
        }

        // button for removal 
        const btn = document.createElement('button');
        btn.classList.add(`remove-${i}`);
        btn.textContent = 'remove';
        

        // event listener to remove the card
        btn.addEventListener('click', function(event){
            event.preventDefault();
            btn.parentElement.remove()
            delete myLibrary[i];
        })

        // creation of read status change button

        const status = document.createElement('button');
        status.textContent = 'Change read status';
        status.addEventListener('click', function(event){
            event.preventDefault();
            switch (myLibrary[i].read) {
                case 'read':
                    myLibrary[i].read = 'not read'
                    break;
            
                case 'not read':
                    myLibrary[i].read = 'read'
                    break;
            }
            displayClear();
            displayBooks(myLibrary)
        })
        
        card.appendChild(status)
        card.appendChild(btn)
        main.appendChild(card);
    }
}

function displayClear() {
    const cardToDispose = document.querySelectorAll('.card')
    for (let i = 0; i < cardToDispose.length; i++) {
        main.removeChild(cardToDispose[i])
    }
}



// Form creation 

const form = document.createElement('form')
form.classList.add('form')

// Input creation

const titleInput = document.createElement('input')
Object.assign(titleInput, {
    placeholder: 'Title of the book',
    name: 'title',
    type: 'text'
})

const authorInput = document.createElement('input')
Object.assign(authorInput, {
    placeholder: 'Author of the book',
    type: 'text',
    name: 'author'
})

const pagesInput = document.createElement('input')
Object.assign(pagesInput, {
    placeholder: 'Number of pages',
    type: 'number',
    name: 'pageCount',
    required: true
})

const readInput = document.createElement('input')
Object.assign(readInput, {
    placeholder: 'Did you read the book',
    type: 'checkbox',
    name: 'read',
    value: 'read',
    id: 'read',
})

// Label creation for readInput
const readInputLabel = document.createElement('label');
readInputLabel.setAttribute('for', 'read')
readInputLabel.textContent = 'Did you read the book?';

// creation of submit button

const btn = document.createElement('button');
btn.textContent = 'Submit book';
btn.addEventListener('click', function (event) {
    event.preventDefault();
    if (validation() == false) {
        return
    }
    bookCreation();
    displayClear();
    displayBooks(myLibrary)
})

form.appendChild(titleInput);
form.appendChild(authorInput);
form.appendChild(pagesInput);
form.appendChild(readInputLabel);
form.appendChild(readInput);
form.appendChild(btn)
util.appendChild(form);

//  creation of funtion to be executed for form submit button

function bookCreation() {
    const inputs = document.querySelectorAll('input');
    const bookAttributes = [];
    for (let i = 0; i < inputs.length; i++) {
        if (i == 3) {
            bookAttributes.push(inputs[i].checked)
            break
        }
        bookAttributes.push(inputs[i].value)
    }
    const newBook = new Book(bookAttributes[0], bookAttributes[1], bookAttributes[2], bookAttributes[3])
    addBookToLibrary(newBook)
}

function validation() {
    const input = document.querySelectorAll('input')
    for (let i = 0; i < input.length; i++) {
        if (input[i].value == '')
            return false
    }
    return true
}

// creation of remove buttons



displayBooks(myLibrary)
