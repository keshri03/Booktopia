import React, { useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import Loader from "./Loader";


const BookFinder = () => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("fiction");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);

  const truncateDescription = (description, maxWords = 40) => {
    return (
      description.split(" ").slice(0, maxWords).join(" ") +
      (description.split(" ").length > maxWords ? "..." : "")
    );
  };

  const fetchBooks = async () => {
    try {
      // Replace with appropriate endpoint for category search
      console.log("requesr aaya"+ input);
      let details="";
      if(category){
        details="Best "+category+" Books";
      }
      else details=input;
      const url = "http://localhost:3000/books";
        
      setIsDataLoading(true);
      const names = await axios.post(url, { details: details });
      
      const bookNames = names.data;
      console.log(bookNames);

      if (bookNames.length === 0) {
        setIsDataLoading(false);
        setError("No book names found from the AI model");
        return;
      }

      // Fetching the book details from Google Books API
      const bookDetailsPromises = bookNames.map(async (name) => {
        const encodedName = encodeURIComponent(name);
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes",
          {
            params: {
              q: encodedName,
              maxResults: 1,
            },
          }
        );
        
  
        if (response.data.items && response.data.items.length > 0) {
          const item = response.data.items[0];
          const description = item.volumeInfo.description || "";
          return {
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            description: truncateDescription(description),
            thumbnail: item.volumeInfo.imageLinks?.thumbnail,
            infoLink: item.volumeInfo.infoLink,
          };
        } else {

          setIsDataLoading(false);
          return { title: name, error: "No details found" };
        }
      });

      const books = await Promise.all(bookDetailsPromises);
      setIsDataLoading(false);
      setBooks(books);
      setError("");
    } catch (error) {
      setIsDataLoading(false);
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategory("");
    fetchBooks();
  };
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    setInput("");
    fetchBooks();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const words = value.trim().split(/\s+/);
    if (words.length <= 40) {
      setInput(value);
    } else {
      setInput(words.slice(0, 40).join(" "));
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-gray-900">
        <div className="relative z-10 p-8  mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
            Find Your Next Great Read 📚
          </h1>
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md mr-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                SEARCH BY CATEGORY
              </h2>
              <form onSubmit={handleSubmitCategory} className="flex flex-col">
                <select
                  className="p-3 border rounded-lg mb-4 text-lg "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="biography">Biography</option>
                  <option value="autobiography">Autobiography</option>
                  <option value="history">History</option>
                  <option value="romance">Romance</option>
                  <option value="thriller">Thriller</option>
                  <option value="horror">Horror</option>
                  <option value="poetry">Poetry</option>
                  <option value="self-help">Self-Help</option>
                  <option value="travel">Travel</option>
                  <option value="cookbook">Cookbook</option>
                  <option value="children">Children</option>
                  <option value="classic">Classic</option>
                </select>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                >
                  Search by Category
                </button>
              </form>
            </div>
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md ml-4 mt-8 md:mt-0">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                SEARCH BY DESCRIPTION
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <textarea
                  className="w-full p-3 border rounded-lg mb-4 placeholder:text-lg"
                  rows="4"
                  placeholder="Describe the content of book you need in at-max 40 words..."
                  value={input}
                  onChange={handleInputChange}
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                >
                  Search by Description
                </button>
              </form>
            </div>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {isDataLoading && (
            <div className="flex items-center justify-center">
              <Loader className="" />
            </div>
          )}
          {books.length > 0 && (
            <section className="mt-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
                SEARCH RESULTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard book={book} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default BookFinder;
