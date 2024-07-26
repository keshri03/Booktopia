import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
      <Link to={book.infoLink} target="_blank" rel="noopener noreferrer">
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-64 object-cover mb-4 rounded-t-lg"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{book.title}</h2>
        <p className="text-gray-600 mb-2">
          by {(book.authors || []).join(", ")}
        </p>
        <p className="text-gray-700 mb-4">{book.description}</p>
        <Link
          to={book.infoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded hover:shadow-lg transition-shadow duration-300"
        >
          View on Google Books
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
