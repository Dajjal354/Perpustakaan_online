export class BookList {
    constructor() {
        this.bookListContainer = document.getElementById("book-list");
        this.filterState = {
            title: '',
            author: '',
            year: '',
            genre: ''
        };
        this.books = [];
        this.onDelete = null;
        this.onEdit = null;
    }

    render(books, onDelete, onEdit) {
        this.books = books;
        this.onDelete = onDelete;
        this.onEdit = onEdit;

        if (books.length === 0) {
            this.bookListContainer.innerHTML = '<p class="text-center">Belum ada buku yang ditambahkan.</p>';
            return;
        }

        this.renderLayout();
        this.attachEventListeners();
        this.renderFilteredBooks();
    }

    renderLayout() {
        this.bookListContainer.innerHTML = `
            <div class="mb-4">
                <div class="card shadow-neumorphic glassy p-3">
                    <h5 class="mb-3">Filter Buku</h5>
                    <div class="row g-3">
                        <div class="col-md-3">
                            <input type="text" 
                                class="form-control rounded-pill" 
                                id="filterTitle" 
                                placeholder="Filter judul..."
                                value="${this.filterState.title}">
                        </div>
                        <div class="col-md-3">
                            <input type="text" 
                                class="form-control rounded-pill" 
                                id="filterAuthor" 
                                placeholder="Filter penulis..."
                                value="${this.filterState.author}">
                        </div>
                        <div class="col-md-3">
                            <input type="number" 
                                class="form-control rounded-pill" 
                                id="filterYear" 
                                placeholder="Filter tahun..."
                                value="${this.filterState.year}">
                        </div>
                        <div class="col-md-3">
                            <select class="form-select rounded-pill" 
                                id="filterGenre">
                                <option value="">Semua Genre</option>
                                ${[...new Set(this.books.map(book => book.genre))].map(genre => `
                                    <option value="${genre}" ${this.filterState.genre === genre ? 'selected' : ''}>${genre}</option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-end mt-2">
                <button class="btn btn-secondary btn-sm rounded-pill" id="resetFilter">
                    Reset Filter
                </button>
            </div>
            <h2 class="h4 mb-3">Daftar Buku</h2>
            <div class="row" id="filtered-books"></div>
        `;
    }

    renderFilteredBooks() {
        const filteredBooksContainer = document.getElementById('filtered-books');
        const filteredBooks = this.filterBooks(this.books);
        
        filteredBooksContainer.innerHTML = filteredBooks
            .map(
                (book) => `
                <div class="col-md-6 mb-3">
                    <div class="card shadow-neumorphic book-card glassy">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text mb-1"><strong>Penulis:</strong> ${book.author}</p>
                            <p class="card-text mb-1"><strong>Tahun:</strong> ${book.year}</p>
                            <p class="card-text mb-2"><strong>Genre:</strong> <span class="badge bg-primary">${book.genre}</span></p>
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-warning btn-sm me-2 edit-btn shadow-neumorphic" data-id="${book.id}">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn shadow-neumorphic" data-id="${book.id}">Hapus</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            )
            .join("");

        // Reattach button event listeners
        filteredBooksContainer.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", () => this.onDelete(button.dataset.id));
        });
    
        filteredBooksContainer.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", () => this.onEdit(button.dataset.id));
        });
    }

    attachEventListeners() {
        ['filterTitle', 'filterAuthor', 'filterYear', 'filterGenre'].forEach(filterId => {
            const filterInput = document.getElementById(filterId);
            filterInput.addEventListener('input', (e) => {
                const filterKey = filterId.replace('filter', '').toLowerCase();
                this.filterState[filterKey] = e.target.value;
                this.renderFilteredBooks();
            });
        });

        document.getElementById('resetFilter')?.addEventListener('click', () => {
            this.filterState = {
                title: '',
                author: '',
                year: '',
                genre: ''
            };
            this.renderLayout();
            this.attachEventListeners();
            this.renderFilteredBooks();
        });
    }

    filterBooks(books) {
        return books.filter(book => {
            const matchTitle = book.title.toLowerCase().includes(this.filterState.title.toLowerCase());
            const matchAuthor = book.author.toLowerCase().includes(this.filterState.author.toLowerCase());
            const matchYear = this.filterState.year === '' || book.year.toString() === this.filterState.year;
            const matchGenre = this.filterState.genre === '' || book.genre === this.filterState.genre;

            return matchTitle && matchAuthor && matchYear && matchGenre;
        });
    }
};