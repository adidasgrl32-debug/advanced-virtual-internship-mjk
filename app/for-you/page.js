"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline, MdLogin } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import { CiClock2, CiStar } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ForYouPage() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    Promise.all([
      axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
      ),

      axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
      ),

      axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
      ),
    ])

      .then(([selectedRes, recommendedRes, suggestedRes]) => {
        setSelectedBooks(selectedRes.data);

        setRecommendedBooks(recommendedRes.data);

        setSuggestedBooks(suggestedRes.data);

        setIsLoading(false);
      })

      .catch((err) => {
        setError(err.message);

        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);

      return;
    }

    const timer = setTimeout(() => {
      axios

        .get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`,
        )

        .then((response) => setSearchResults(response.data));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="wrapper">
      <div className="search__background">
        <div className="search__wrapper">
          <figure></figure>
          <div className="search__content">
            <div className="search">
              <div className="search__input--wrapper">
                <input
                  className="search__input"
                  placeholder="Search for books"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="search__icon">
                  <IoMdSearch />
                </div>
              </div>
            </div>
            <div className="sidebar__toggle--btn">
              <button>
                <RxHamburgerMenu />
              </button>
            </div>
          </div>

          {search && (
            <div className="search__books--wrapper">
              {searchResults.length === 0 ? (
                <div className="search__book--link">No books found</div>
              ) : (
                searchResults.map((book) => (
                  <a
                    key={book.id}
                    className="search__book--link"
                    href={`/book/${book.id}`}
                  >
                    <figure
                      className="book__image--wrapper"
                      style={{
                        height: "80px",
                        width: "80px",
                        minWidth: "80px",
                      }}
                    >
                      <img
                        className="book__image"
                        src={book.imageLink}
                        alt={book.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </figure>
                    <div>
                      <div className="search__book--title">{book.title}</div>
                      <div className="search__book--author">{book.author}</div>
                    </div>
                  </a>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sidebar__overlay sidebar__overlay--hidden"></div>
      <div className="sidebar sidebar--closed">
        <div className="sidebar__logo">
          <Image src="/logo.png" alt="Company Logo" width={200} height={46} />
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <a className="sidebar__link--wrapper" href="/for-you">
              <div className="sidebar__link--line active--tab" />

              <div className="sidebar__icon--wrapper" />

              <div className="sidebar__link--text">
                <AiOutlineHome className="w-6 h-6" /> For you
              </div>
            </a>
            <a className="sidebar__link--wrapper" href="/for-you">
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <FaRegBookmark /> My Library
              </div>
            </a>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <FaHighlighter /> Highlights
              </div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <IoMdSearch className="w-6 h-6" /> Search
              </div>
            </div>
          </div>
          <div className="sidebar__bottom">
            <a className="sidebar__link--wrapper" href="/settings">
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <IoSettingsOutline className="w-6 h-6" /> Settings
              </div>
            </a>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <MdHelpOutline className="w-6 h-6" /> Help & Support
              </div>
            </div>
            <div className="sidebar__link--wrapper">
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <MdLogin /> Login
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="container">
          <div className="for-you__wrapper">
            <div className="for-you__title">Selected just for you</div>
            {selectedBooks.map((item) => (
              <a
                key={item.id}
                className="selected__book"
                href={`/book/${item.id}`}
              >
                <div className="selected__book--sub-title">{item.subTitle}</div>
                <div className="selected__book--line" />
                <div className="selected__book--content">
                  <figure
                    className="book__image--wrapper"
                    style={{
                      height: "140px",
                      width: "140px",
                      minWidth: "140px",
                    }}
                  >
                    <img
                      className="book__image"
                      src={item.imageLink}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </figure>
                  <div className="selected__book--text">
                    <div className="selected__book--title">{item.title}</div>
                    <div className="selected__book--author">{item.author}</div>
                    <div className="selected__book--duration-wrapper">
                      <div className="selected__book--icon">
                        <IoIosPlayCircle />
                      </div>
                      <div className="selected__book--duration">
                        3 mins 23 secs
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}

            <div>
              <div className="for-you__title">Recommended For You</div>
              <div className="for-you__sub--title">
                We think you&apos;ll like these
              </div>
              <div className="for-you__recommended--books">
                {recommendedBooks.map((item) => (
                  <a
                    key={item.id}
                    className="for-you__recommended--books-link"
                    href={`/book/${item.id}`}
                    style={{ position: "relative" }}
                  >
                    {item.subscriptionRequired && (
                      <div
                        className="book__pill"
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "fit-content",
                        }}
                      >
                        Premium
                      </div>
                    )}
                    <figure
                      className="book__image--wrapper"
                      style={{ height: "172px", width: "172px" }}
                    >
                      <img
                        className="book__image"
                        src={item.imageLink}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </figure>
                    <div className="recommended__book--title">{item.title}</div>
                    <div className="recommended__book--author">
                      {item.author}
                    </div>
                    <div className="recommended__book--sub-title">
                      {item.subTitle}
                    </div>
                    <div className="recommended__book--details-wrapper">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <CiClock2 />
                        </div>
                        <div className="recommended__book--details-text">
                          03:24
                        </div>
                      </div>
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <CiStar />
                        </div>
                        <div className="recommended__book--details-text">
                          {item.averageRating}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="for-you__title">Suggested Books</div>
              <div className="for-you__sub--title">Browse those books</div>
              <div className="for-you__recommended--books">
                {suggestedBooks.map((item) => (
                  <a
                    key={item.id}
                    className="for-you__recommended--books-link"
                    href={`/book/${item.id}`}
                    style={{ position: "relative" }}
                  >
                    {item.subscriptionRequired && (
                      <div
                        className="book__pill"
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "fit-content",
                        }}
                      >
                        Premium
                      </div>
                    )}
                    <figure
                      className="book__image--wrapper"
                      style={{ height: "172px", width: "172px" }}
                    >
                      <img
                        className="book__image"
                        src={item.imageLink}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </figure>
                    <div className="recommended__book--title">{item.title}</div>
                    <div className="recommended__book--author">
                      {item.author}
                    </div>
                    <div className="recommended__book--sub-title">
                      {item.subTitle}
                    </div>
                    <div className="recommended__book--details-wrapper">
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <CiClock2 />
                        </div>
                        <div className="recommended__book--details-text">
                          03:24
                        </div>
                      </div>
                      <div className="recommended__book--details">
                        <div className="recommended__book--details-icon">
                          <CiStar />
                        </div>
                        <div className="recommended__book--details-text">
                          {item.averageRating}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
