// DOM
const navBtns = document.querySelectorAll("#book-nav li button");
const addBtn = document.querySelector("#add-btn");
const closeBtn = document.querySelector("#close-btn");
const popup = document.querySelector(".popup");

addBtn.addEventListener("click", function() {
    popup.classList.add("active");
    document.querySelector("main").classList.add("hidden");
});

closeBtn.addEventListener("click", function() {
    popup.classList.remove("active");
    document.querySelector("main").classList.remove("hidden");
});

// Global Properties
const doneIcon = `<span class="material-icons">done</span>`;
const removeDoneIcon = `<span class="material-icons">remove_done</span>`;
const deleteIcon = `<span class="material-icons">delete</span>`;
const myLibrary = [];
let activeNav = navBtns[0];
render(activeNav);

// Book Constructor
function Book(title, author, pageCount, isRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    render(activeNav);
}

function deleteBookFromLibrary(deleteBtnObj) {
    const bookIndex = deleteBtnObj.value;
    myLibrary.splice(bookIndex, 1);

    render(activeNav);
}

function toggleRead(toggleReadBtnObj) {
    Book.prototype.toggleIsRead = function() {
        // toggle isRead state
        this.isRead = !this.isRead;
    }
    const bookIndex = toggleReadBtnObj.value;
    myLibrary[bookIndex].toggleIsRead();

    render(activeNav);
}

// Render Book from nav btn
function render(btnObj) {
    activeNav = btnObj;

    // Reset styling
    for (let i = 0; i < navBtns.length; i++) {
        navBtns[i].classList.remove("active");
    }  

    // Add active class to the btn
    btnObj.classList.add("active");

    
    // Create all book elements of myLibrary
    const myLibraryLis = []
    for (let i = 0; i < myLibrary.length; i++) {
        const newBookLi = document.createElement("li");
        const newBookDiv = document.createElement("div");
        const newBookTitle = document.createElement("h3");
        const newBookDescription = document.createElement("p");
        const newBookBtnDiv = document.createElement("div");
        const bookToggleReadBtn = document.createElement("button");
        const bookDeleteBtn = document.createElement("button");

        // Book content
        newBookTitle.textContent = myLibrary[i].title;
        newBookDescription.textContent = `${myLibrary[i].author}, ${myLibrary[i].pageCount} pages`;

        // Read State
        bookToggleReadBtn.setAttribute("onclick", "toggleRead(this)");
        bookToggleReadBtn.setAttribute("value", i);
        bookToggleReadBtn.innerHTML = (myLibrary[i].isRead) ? doneIcon : removeDoneIcon;

        // Delte Button
        bookDeleteBtn.setAttribute("onclick", "deleteBookFromLibrary(this)");
        bookDeleteBtn.setAttribute("value", i);
        bookDeleteBtn.innerHTML = deleteIcon;

        // Book Container
        newBookDiv.classList.add("book-container");
        newBookDiv.appendChild(newBookTitle);
        newBookDiv.appendChild(newBookDescription);

        // Book Buttons
        newBookBtnDiv.classList.add("book-btns");
        newBookBtnDiv.appendChild(bookToggleReadBtn);
        newBookBtnDiv.appendChild(bookDeleteBtn);

        // Book li & ul
        newBookLi.appendChild(newBookDiv);
        newBookLi.appendChild(newBookBtnDiv);
        myLibraryLis.push(newBookLi);
    }

    // Render content
    const bookUlEl = document.querySelector(".book-ul ul");
    bookUlEl.innerHTML = "";
    const activeLibraryLis = [];
    if (activeNav === navBtns[0]) {
        for (let i = 0; i < myLibrary.length; i++) {
            activeLibraryLis.push(myLibraryLis[i]);
        }
    } else if (activeNav === navBtns[1]) {
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].isRead) {
                activeLibraryLis.push(myLibraryLis[i]);
            }
        }
    } else {
        for (let i = 0; i < myLibrary.length; i++) {
            if (!myLibrary[i].isRead) {
                activeLibraryLis.push(myLibraryLis[i]);
            }
        }
    }

    for (let i = 0; i < activeLibraryLis.length; i++) {
        bookUlEl.appendChild(activeLibraryLis[i]);
    }


}

function validateBookSubmission() {
    const titleEl = document.querySelector(".add-form-el #title");
    const authorEl = document.querySelector(".add-form-el #author");
    const pageCountEl = document.querySelector(".add-form-el #page-count");
    const isReadEl = document.querySelector(".add-form-el #is-read");

    // Fail Validate Case
    if (titleEl.value === "" 
        || authorEl.value === "" 
        || !(Number.isInteger(Number(pageCountEl.value))) 
        || parseInt(pageCountEl.value) < 1) {
        document.querySelector(".add-form-el button").classList.add("invalid");
        return;
    }

    // Pass Validate Case
    document.querySelector(".add-form-el button").classList.remove("invalid");
    const book = new Book(titleEl.value, authorEl.value, parseInt(pageCountEl.value), isReadEl.checked);
    addBookToLibrary(book);
    popup.classList.remove("active");
    document.querySelector("main").classList.remove("hidden");
}