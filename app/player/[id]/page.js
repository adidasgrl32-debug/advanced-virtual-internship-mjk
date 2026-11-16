"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline, MdLogin } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import React, { useEffect, useState, use } from "react";
import AudiobookPlayer from "../../components/AudiobookPlayer";

export default function PlayerPage({ params }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { id } = use(params);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
      .then((response) => {
        setData([response.data]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!search) {
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
              <button type="button">
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
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={46}
            priority
          />
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
              <div className="sidebar__link--line active--tab" />
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
            <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
              <div className="sidebar__link--text sidebar__font--size-cicon sidebar__font--size-icon--active">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="sidebar__font--size-icon-small"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
              </div>
              <div className="sidebar__link--text sidebar__font--size-icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="sidebar__font--size-icon-medium"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
              </div>
              <div className="sidebar__link--text sidebar__font--size-icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="sidebar__font--size-icon-large"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
              </div>
              <div className="sidebar__link--text sidebar__font--size-icon">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="sidebar__font--size-icon-xlarge"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M11.246 15H4.754l-2 5H.6L7 4h2l6.4 16h-2.154l-2-5zm-.8-2L8 6.885 5.554 13h4.892zM21 12.535V12h2v8h-2v-.535a4 4 0 1 1 0-6.93zM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                  </g>
                </svg>
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
          
      {data?.map?.((item, index) => (
        <div key={index} className="summary">
          <div className="audio__book--summary" style={{ fontSize: "16px" }}>
            <div className="audio__book--summary-title">{item.title}</div>
            <div className="audio__book--summary-text">{item.summary}</div>
          </div>
          <div className="audio__book--spinner">
            <svg>spinner</svg>
          </div>
          <div className="audio__wrapper">
            <AudiobookPlayer />
            <audio src={item.audioLink} controls />
            <div className="audio__track--wrapper">
              <figure className="audio__track--image-mask">
                <figure
                  className="book__image--wrapper"
                  style={{ height: "48px", width: "48px", minWidth: "48px" }}
                >
                  <img
                    className="book__image"
                    src={item.imageLink}
                    alt="book"
                    style={{ diplay: "block" }}
                  />
                  <div
                    className="skeleton"
                    style={{ width: "48px", height: "48px" }}
                  ></div>
                </figure>
              </figure>
              <div className="audio__track--details-wrapper">
                <div
                  className="skeleton"
                  style={{ width: "50px", height: "16px", marginBottom: "8px" }}
                ></div>
                <div className="audio__track--title">{item.title}</div>
                <div
                  className="skeleton"
                  style={{ width: "100px", height: "16px" }}
                ></div>
                <div className="audio__track--author">{item.author}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}