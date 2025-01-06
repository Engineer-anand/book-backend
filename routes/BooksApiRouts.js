const router = require('express').Router();
const axios = require('axios');
;

// const app = express();

// Search route for books by title
router.get('/', async (req, res) => {
  const { title } = req.query;  // Get the title from the query string

  if (!title) {
    return res.status(400).json({ error: 'Title parameter is required' });
  }

  try {
    // Make the API request to OpenLibrary search
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);

    // Process the response data
    const books = response.data.docs.map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
      first_publish_year: book.first_publish_year || 'Unknown',
      isbn: book.isbn ? book.isbn[0] : 'N/A',
      openlibrary_id: book.key,
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
      read_link: book.ebook_count_i > 0 ? `https://openlibrary.org${book.key}/borrow` : null
    }));

    // Send the book data back to the client
    res.json({ results: books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'An error occurred while fetching books from OpenLibrary.' });
  }
});

// Route to fetch a book by its OpenLibrary ID (for more detailed information)
router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Get the OpenLibrary ID from the URL

  try {
    // Make the API request to OpenLibrary for detailed book info
    const response = await axios.get(`https://openlibrary.org/works/${id}.json`);

    // Process and return the book details
    const bookDetails = {
      title: response.data.title,
      description: response.data.description ? response.data.description.value : 'No description available.',
      authors: response.data.authors ? response.data.authors.map(author => author.name).join(', ') : 'Unknown',
      subjects: response.data.subjects || [],
      cover: response.data.cover_id ? `https://covers.openlibrary.org/b/id/${response.data.cover_id}-L.jpg` : null
    };

    res.json(bookDetails);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ error: 'An error occurred while fetching book details.' });
  }
});

// Route to fetch books from a user's "want to read" list (using OpenLibrary's user API)
router.get('/', async (req, res) => {
  try {
    // Make the API request to fetch books from the user's "want to read" list
    const response = await axios.get('https://openlibrary.org/people/mekBot/books/want-to-read.json');

    // Process the book data
    const books = response.data.books.map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
      first_publish_year: book.first_publish_year || 'Unknown',
      isbn: book.isbn ? book.isbn[0] : 'N/A',
      openlibrary_id: book.key,
      cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null
    }));

    // Return the results
    res.json({ results: books });
  } catch (error) {
    console.error('Error fetching books from "Want to Read":', error);
    res.status(500).json({ error: 'An error occurred while fetching the books from OpenLibrary.' });
  }
});

module.exports = router;

