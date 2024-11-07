import { LibraryController } from "./controllers/LibraryController.js";
import { BookForm } from "./views/BookForm.js";
import { BookList } from "./views/BookList.js";

try {
    const bookForm = new BookForm();
    const bookList = new BookList();
    const libraryController = new LibraryController(bookForm, bookList);

    bookForm.render(libraryController.addBook.bind(libraryController));
    bookList.render(
        libraryController.books,
        libraryController.deleteBook.bind(libraryController),
        libraryController.editBook.bind(libraryController)
    );

    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) {
        throw new Error("Theme toggle element not found");
    }
    
    themeToggle.addEventListener(
        "click", 
        libraryController.toggleTheme.bind(libraryController)
    );
    libraryController.initTheme();
} catch (error) {
    console.error("Error initializing application:",error);
}