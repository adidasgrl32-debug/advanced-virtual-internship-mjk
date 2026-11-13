"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline, MdLogin } from "react-icons/md";
import { CiClock2, CiStar } from "react-icons/ci";
import { HiOutlineMicrophone, HiOutlineLightBulb } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { SlBookOpen } from "react-icons/sl";
import axios from "axios";
import React, { useEffect, useState, use } from "react";
import SearchBar from "@/app/components/SearchBar";

export default function BookIdPage({ params }) {
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

      <div className="sidebar__overlay sidebar__overlay--hidden" />
      <div className="sidebar sidebar--closed">
        <div className="sidebar__logo">
          <Image src="/logo.png" alt="Company Logo" width={200} height={46} priority />
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
        <div key={index} className="row">
          <audio />
          <div className="container">
            <div className="inner__wrapper">
              <div className="inner__book">
                <div className="inner-book__title">{item.title}</div>
                <div className="inner-book__author">{item.author}</div>
                <div className="inner-book__sub--title">{item.subTitle}</div>

                <div className="inner-book__wrapper">
                  <div className="inner-book__description--wrapper">
                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <CiStar />
                      </div>
                      <div className="inner-book__overall--rating">{item.averageRating}</div>
                      <div className="inner-book__total--rating">({item.totalRating} Ratings)</div>
                    </div>

                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <CiClock2 />
                      </div>
                      <div className="inner-book__duration">{item.duration}00.00</div>
                    </div>

                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <HiOutlineMicrophone />
                      </div>
                      <div className="inner-book__type">{item.type}</div>
                    </div>

                    <div className="inner-book__description">
                      <div className="inner-book__icon">
                        <HiOutlineLightBulb />
                      </div>
                      <div className="inner-book__key--ideas">{item.keyIdeas} Key Ideas</div>
                    </div>
                  </div>
                </div>

                <div className="inner-book__read--btn-wrapper">
                  <button className="inner-book__read--btn">
                    <div className="inner-book__read--icon">
                      <SlBookOpen />
                    </div>
                    <div className="inner-book__read--text">Read</div>
                  </button>
                  <button className="inner-book__read--btn">
                    <div className="inner-book__read--icon">
                      <HiOutlineMicrophone />
                    </div>
                    <div className="inner-book__read--text">Listen</div>
                  </button>
                </div>

                <div className="inner-book__bookmark">
                  <div className="inner-book__bookmark-icon">
                    <FaRegBookmark />
                  </div>
                  <div className="inner-book__bookmark--text">Add title to My Library</div>
                </div>

                <div className="inner-book__secondary--title">What's it about?</div>
                <div className="inner-book__tags--wrapper">
                  <div className="inner-book__tag">{item.tags[0]}</div>
                  <div className="inner-book__tag">{item.tags[1]}</div>
                </div>

                <div className="inner-book__book--description">{item.bookDescription}</div>
                <h2 className="inner-book__secondary--title">About the author</h2>
                <div className="inner-book__author--description">{item.authorDescription}</div>
              </div>

              <div className="inner-book--img-wrapper">
                <figure
                  className="book__image--wrapper"
                  style={{ height: "300px", width: "300px", minWidth: "300px" }}
                >
                  {item.imageLink ? (
                    <img
                      className="book__image"
                      style={{ display: "block" }}
                      src={item.imageLink}
                      alt={item.title || "Book cover"}
                    />
                  ) : null}
                </figure>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}