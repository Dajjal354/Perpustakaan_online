export class BookForm {
    constructor() {
        this.formContainer = document.getElementById("book-form");
        this.genres = [
            "Fiksi",
            "Non-Fiksi",
            "Misteri",
            "Romantis",
            "Sains",
            "Sejarah",
            "Teknologi",
            "Pendidikan",
            "Komik",
            "Biografi"
        ];
    }
  
    render(onSubmit) {
        this.formContainer.innerHTML = `
            <div class="card form-card glassy">
                <div class="card-body">
                    <h2 class="h2 mb-3">Tambah/Edit Buku</h2>
                    <form id="book-form">
                        <div class="mb-3">
                            <label for="title" class="form-label">Judul-Buku</label>
                            <input type="text" class="form-control rounded-pill" id="title" placeholder="Judul Buku" required>
                        </div>
                        <div class="mb-3">
                            <label for="author" class="form-label">Penulis</label>
                            <input type="text" class="form-control rounded-pill" id="author" placeholder="Penulis Buku" required>
                        </div>
                        <div class="mb-3">
                            <label for="year" class="form-label">Tahun Terbit</label>
                            <input type="number" class="form-control rounded-pill" id="year" placeholder="Tahun Buku" required>
                        </div>
                        <div class="mb-3">
                            <label for="genre" class="form-label">Genre</label>
                            <select class="form-select rounded-pill" id="genre" required>
                                <option value="">Pilih Genre</option>
                                ${this.genres.map(genre => `
                                    <option value="${genre}">${genre}</option>
                                `).join('')}
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary w-100 rounded-pill shadow-neumorphic">Simpan Buku</button>
                    </form>
                </div>
            </div>
        `;
  
        this.formContainer.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const year = document.getElementById("year").value;
            const genre = document.getElementById("genre").value;
            onSubmit({title, author, year, genre});
            this.resetForm();
        });
    }
  
    fillForm(book) {
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("year").value = book.year;
        document.getElementById("genre").value = book.genre;
    }
  
    resetForm() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("year").value = "";
        document.getElementById("genre").value = "";
    }
}