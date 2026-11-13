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
import SearchBar from "../components/SearchBar";

export default function ForYouPage({ data }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    async function fetchBooks() {
      try {
        const [selectedRes, recommendedRes, suggestedRes] = await Promise.all([
          axios.get(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
          ),

          axios.get(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
          ),

          axios.get(
            "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
          ),
        ]);

        setSelectedBook(selectedRes.data[0]);
        setRecommendedBooks(recommendedRes.data);
        setSuggestedBooks(suggestedRes.data);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchBooks();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div id="__next">
      <div className="wrapper">
        <div className="search__background">
          <div className="search__wrapper">
            <figure>
              <img src="logo" alt="" />
            </figure>
              <SearchBar />
              <div
                className="sidebar__toggle--btn"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <button type="button">
                  <RxHamburgerMenu />
                </button>
              </div>
            </div>
          </div>
        <div
          className={`sidebar__overlay ${
            isSidebarOpen ? "" : "sidebar__overlay--hidden"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        <div
          className={`sidebar ${
            isSidebarOpen ? "sidebar--opened" : "sidebar--closed"
          }`}
        >
          <div className="sidebar__logo">
            <Image src="/logo.png" alt="Company Logo" width={200} height={46} priority/>
          </div>

          <div className="sidebar__wrapper">
            <div className="sidebar__top">
              <a className="sidebar__link--wrapper" href="/for-you">
                <div className="sidebar__link--line active--tab" />

                <div className="sidebar__icon--wrapper">
                  <AiOutlineHome className="w-6 h-6" />
                </div>

                <div className="sidebar__link--text">For you</div>
              </a>

              <a className="sidebar__link--wrapper" href="/for-you">
                <div className="sidebar__link--line" />

                <div className="sidebar__icon--wrapper">
                  <FaRegBookmark />
                </div>

                <div className="sidebar__link--text">My Library</div>
              </a>

              <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                <div className="sidebar__link--line" />

                <div className="sidebar__icon--wrapper">
                  <FaHighlighter />
                </div>

                <div className="sidebar__link--text">Highlights</div>
              </div>

              <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                <div className="sidebar__link--line" />

                <div className="sidebar__icon--wrapper">
                  <IoMdSearch className="w-6 h-6" />
                </div>

                <div className="sidebar__link--text">Search</div>
              </div>
            </div>

            <div className="sidebar__bottom">
              <a className="sidebar__link--wrapper" href="/settings">
                <div className="sidebar__link--line" />

                <div className="sidebar__icon--wrapper">
                  <IoSettingsOutline className="w-6 h-6" />
                </div>

                <div className="sidebar__link--text">Settings</div>
              </a>

              <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                <div className="sidebar__link--line" />

                <div className="sidebar__icon--wrapper">
                  <MdHelpOutline className="w-6 h-6" />
                </div>

                <div className="sidebar__link--text">Help & Support</div>
              </div>

              <a className="sidebar__link--wrapper" href="/login">
                <div className="sidebar__link--line" />

                <div className="sidebar__icon--wrapper">
                  <MdLogin />
                </div>
                <div className="sidebar__link--text">Login</div>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="for-you__wrapper">
              <div className="for-you__title">Selected just for you</div>
              {selectedBook && (
                <a className="selected__book" href={`/book/${selectedBook.id}`}>
                  <div className="selected__book--sub-title">
                    {selectedBook.subTitle}
                  </div>
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
                        src={selectedBook.imageLink}
                        alt={selectedBook.title}
                        style={{
                          width: "100%",

                          height: "100%",

                          objectFit: "cover",
                        }}
                      />
                    </figure>
                    <div className="selected__book--text">
                      <div className="selected__book--title">
                        {selectedBook.title}
                      </div>

                      <div className="selected__book--author">
                        {selectedBook.author}
                      </div>
                      <div className="selected__book--duration-wrapper">
                        <div className="selected__book--icon">
                          <button type="button">
                            <IoIosPlayCircle />
                          </button>
                        </div>
                        <div className="selected__book--duration">
                          3 mins 23 secs
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              )}
              <div>
                <div className="for-you__title">Recommended For You</div>
                <div className="for-you__sub--title">
                  We think you'll like these
                </div>
                <div className="for-you__recommended--books">
                  {recommendedBooks.map((item) => (
                    <a
                      key={item.id}
                      className="for-you__recommended--books-link"
                      href={`/book/${item.id}`}    
                    >
                      {data?.subscription?.premium && (
                        <div className="book__pill book__pill--subscription-required">
                          {item.subscriptionRequired} Premium
                        </div>
                      )}
                      <figure className="book__image--wrapper">
                        <img
                          src={item.imageLink}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%"
                          }}
                        />
                      </figure>
                      <div className="recommended__book--title">
                        {item.title}
                      </div>
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
                    >
                      <figure className="book__image--wrapper">
                        <img
                          src={item.imageLink}
                          alt={item.title}
                          style={{
                            width: "100%",

                            height: "100%",

                            objectFit: "cover",
                          }}
                        />
                      </figure>

                      <div className="recommended__book--title">
                        {item.title}
                      </div>

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
    </div>
  );
}
