import React from "react";
import { Link } from "react-router-dom";
import "animate.css"; // Ensure Animate.css is installed and imported

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-gray-800 flex flex-col justify-center items-center text-center overflow-hidden">
      

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-3 py-10">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left mr- mb-10 md:mb-0">
          <h1 className="text-5xl font-extrabold mb-6 text-teal-700 drop-shadow-lg transition-transform duration-1000 ease-in-out transform hover:scale-105 animate-bounce animate__animated animate__fadeIn animate__delay-0.5s">
            WELCOME TO BOOKTOPIA! 🌟
          </h1>

          <p className="text-xl mb-6 text-gray-700 drop-shadow-lg animate__animated animate__fadeIn animate__delay-0.75s">
            Dive into a world of captivating stories, inspiring narratives, and
            transformative adventures. Booktopia is your gateway to discovering
            hidden literary gems and beloved classics alike.
          </p>

          <Link to="/books">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 animate__animated animate__fadeIn animate__delay-0.5s cursor-pointer">
              Explore Amazing Books
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <section className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold mb-6 text-teal-700  animate__animated animate__fadeIn animate__delay-1s animate__zoomIn animate__faster">
            SOME FASCINATING FACTS ABOUT BOOKS
          </h2>

          <ul className="space-y-4 text-lg text-gray-800">
            <li className="animate__animated animate__fadeIn ">
              <strong className="text-teal-700">
                The Longest Novel Ever Written:
              </strong>{" "}
              The longest novel ever published is "In Search of Lost Time" by
              Marcel Proust, which has an estimated 1.2 million words.
            </li>
            <li className="animate__animated animate__fadeIn ">
              <strong className="text-teal-700">The Oldest Known Book:</strong>{" "}
              The oldest surviving book is "The Epic of Gilgamesh," written in
              ancient Mesopotamia around 2100 BC. It's considered one of the
              earliest works of literary fiction.
            </li>
            <li className="animate__animated animate__fadeIn ">
              <strong className="text-teal-700">Books in Space:</strong>{" "}
              Astronauts have taken books into space. The first book to be sent
              to space was "The Adventures of Tintin" aboard a Soviet spacecraft
              in 1965.
            </li>
            <li className="animate__animated animate__fadeIn ">
              <strong className="text-teal-700">
                The Most Expensive Book Ever Sold:
              </strong>{" "}
              The most expensive book ever sold is a first edition of "The Codex
              Leicester" by Leonardo da Vinci, purchased for $30.8 million in
              1994.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
