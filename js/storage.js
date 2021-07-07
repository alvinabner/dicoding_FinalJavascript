const STORAGE_KEY = 'BOOKSHELF_APPS';

let book_array = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert('Browser tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(book_array);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function loadData() {
    const key = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(key);

    if (data !== null) {
        book_array = data;
    }

    document.dispatchEvent(new Event('ondataloaded'));
}

function updateData() {
    if (isStorageExist()) {
        saveData();
    }
}

function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(), title, author, year, isCompleted
    };
}

function findBook(bookId) {
    for (book of book_array) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of book_array) {
        if (book.id === bookId)
            return index;
        index++;
    }
    return -1;
}

function refreshData() {
    const listUncomplete = document.getElementById(BOOK_UNCOMPLETE);
    let listComplete = document.getElementById(BOOK_COMPLETE);

    for (book of book_array) {
        const newBook = makeBook(book.title, book.author, book.year, book.isCompleted);
        newBook[BOOK_ID] = book.id;
        if (book.isCompleted) {
            listComplete.append(newBook);
        } else {
            listUncomplete.append(newBook);
        }
    }
}