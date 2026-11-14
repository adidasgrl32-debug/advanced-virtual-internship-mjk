"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      axios
        .get(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`)
        .then((response) => setResults(response.data));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="search">
      <div className="search__input--wrapper">
        <input
          className="search__input"
          placeholder="Search for books"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="search__icon">
          <IoMdSearch />
        </div>
      </div>

      {search && (
        <div className="search__books--wrapper">
          {results.length === 0 ? (
            <div className="search__book--link">No books found</div>
          ) : (
            results.map((book) => (
              <a
                key={book.id}
                className="search__book--link"
                href={`/book/${book.id}`}
              >
                <figure className="search__book--image--wrapper book__image--wrapper">
                  <img
                    className="search__book--image book__image"
                    src={book.imageLink}
                    alt={book.title}
                  />
                </figure>
                <div>
                  <div className="search__book--title">{book.title}</div>
                  <div className="search__book--author">{book.author}</div>
                  {book.duration && (
                    <div className="search__book--duration">
                      {book.duration}
                    </div>
                  )}
                </div>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}