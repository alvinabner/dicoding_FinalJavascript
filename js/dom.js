const BOOK_UNCOMPLETE = 'incompleteBookshelfList';
const BOOK_COMPLETE = 'completeBookshelfList';
const BOOK_ID = 'bookId';

function makeBook(title, author, year, isCompleted) {
    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('class-title');
    bookTitle.innerHTML = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('class-author');
    bookAuthor.innerText = author;
    
    const bookYear = document.createElement('p');
    bookYear.classList.add('class-year');
    bookYear.innerText = year;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');
    
    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(bookTitle, bookAuthor, bookYear);
    textContainer.append(buttonContainer);
    
    if (isCompleted) {
        buttonContainer.append(createUncompleteButton(), createDeleteButton());
    } else {
        buttonContainer.append(createCompleteButton(), createDeleteButton());
    }
    
    return textContainer;
}

function createButton(buttonTypeClass, text, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.innerText = text;
    button.addEventListener('click', function(event) {
        eventListener(event);
    });

    return button;
}

function createCompleteButton() {
    return createButton('green', 'Finished Read', function(event) {
        addBookComplete(event.target.parentElement.parentElement);
    });
}

function createUncompleteButton() {
    return createButton('ungreen', 'Unfinished', function(event) {
        undoBookCompleted(event.target.parentElement.parentElement);
    });
}

function createDeleteButton() {
    return createButton('red', 'Delete', function(event) {
        removeBook(event.target.parentElement.parentElement);
    });
}

function addBook() {
    const uncompleteBook = document.getElementById(BOOK_UNCOMPLETE);
    const completeBook = document.getElementById(BOOK_COMPLETE);

    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const checkbox = document.getElementById('inputBookIsComplete');
    
    if (checkbox.checked) {    
        const bookName = makeBook(bookTitle, bookAuthor, bookYear, true);
        const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, true);

        bookName[BOOK_ID] = bookObject.id;
        book_array.push(bookObject);
        completeBook.append(bookName);

        alert('Book Added!')
        updateData();

    } else {
        const bookName = makeBook(bookTitle, bookAuthor, bookYear, false);
        const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);

        bookName[BOOK_ID] = bookObject.id;
        book_array.push(bookObject);
        uncompleteBook.append(bookName);

        alert('Book Added!')
        updateData();
    }
}

function addBookComplete(bookElement) {
    const listCompleted = document.getElementById(BOOK_COMPLETE);

    const bookTitleElement= bookElement.querySelector('#incompleteBookshelfList > .book_item > h3').innerText;
    const bookAuthorElement = bookElement.querySelector('.class-author').innerText;
    const bookYearElement = bookElement.querySelector('.class-year').innerText;

    const newBook = makeBook(bookTitleElement, bookAuthorElement, bookYearElement, true);

    const bookName = findBook(bookElement[BOOK_ID]);
    bookName.isCompleted = true;
    
    newBook[BOOK_ID] = bookName.id;
    listCompleted.append(newBook);
    bookElement.remove();
    
    updateData();
}

function undoBookCompleted(bookElement) {
    const listUncompleted = document.getElementById(BOOK_UNCOMPLETE);

    const bookTitleElement = bookElement.querySelector('#completeBookshelfList > .book_item > h3').innerText;
    const bookAuthorElement = bookElement.querySelector('.class-author').innerText;
    const bookYearElement = bookElement.querySelector('.class-year').innerText;

    const newBook = makeBook(bookTitleElement, bookAuthorElement, bookYearElement, false);

    const bookName = findBook(bookElement[BOOK_ID]);
    bookName.isCompleted = false;
    
    newBook[BOOK_ID] = bookName.id;
    listUncompleted.append(newBook);
    bookElement.remove();

    updateData();
}

function removeBook(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ID]);
    book_array.splice(bookPosition, 1);
    bookElement.remove();
    updateData();
    alert('Book Removed!')
}
