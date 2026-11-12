"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline, MdLogin } from "react-icons/md";
import { IoIosPlayCircle } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function foryouPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <body>
      <div id="__next">
        <div className="wrapper">
          <div className="search__background">
            <div className="search__wrapper">
              <figure>
                <img src="logo" alt="" />
              </figure>
              <div className="search__content">
                <div className="search">
                  <div className="search__input--wrapper">
                    <input
                      className="search__input"
                      placeholder="Search for books"
                      type="text"
                      defaultValue=""
                    />
                    <div className="search__icon">
                      <svg>
                        <IoMdSearch />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="sidebar__toggle--btn">
                  <button>
                    <RxHamburgerMenu />
                  </button>
                </div>
              </div>
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
                    <IoMdSearch className="w-6 h-6" /> Search</div>
                </div>
              </div>

              <div className="sidebar__bottom">
                <a className="sidebar__link--wrapper" href="/settings">
                  <div className="sidebar__link--line" />
                  <div className="sidebar__icon--wrapper" />
                  <div className="sidebar__link--text">
                    <IoSettingsOutline className="w-6 h-6"/> Settings</div>
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
                    <MdLogin /> Login</div>
                </div>
              </div>
            </div>
          </div>
          {data.map((item) => (
          <div className="row">
            <div className="container">
              <div className="for-you__wrapper">
                <div className="for-you__title">Selected just for you</div>
                <audio />
                <a className="selected__book" href={`/book${item.id}`}>
                  <div className="selected__book--sub-title">{item.subTitle}
                  </div>
                  <div className="selected__book--line" />
                  <div className="selected__book--content">
                    <figure
                      className="book__image--wrapper"
                      style={{ height: "140px", width: "140px", minWidth: "140px" }}
                    >
                      <img
                        src={item.imageLink}
                        alt={item.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </figure>
                    <div className="selected__book--text">
                      <div className="selected__book--title">{item.title}</div>
                      <div className="selected__book--author">{item.author}</div>
                      <div className="slected__book--duration-wrapper">
                        <div className="selected__book--icon">
                          <button type="button"><IoIosPlayCircle /></button>
                        </div>
                        <div className="selected__book--duration">{item.duration}</div>
                      </div>
                    </div>
                  </div>
                </a>

                <div>
                  <div className="for-you__title">Recommended For You</div>
                  <div className="for you__sub--title">We think you'll like these</div>
                  <div className="for-you__recommended--books">
                      <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                        <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text"><CiClock2 /> {item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text"><CiStar />{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}e</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                          <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                          <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                         <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                </div>
              </div>
                <div>
                  <div className="for-you__title">Suggested Books</div>
                  <div className="for-you__sub--title">Browse those books</div>
                   <div className="for-you__recommended--books">
                      <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text"><CiClock2 />{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text"><CiStar /> {item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                          <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                        <a className="for-you__recommended--books-link" href={`/book${item.id}`}>
                        <audio></audio>
                           <figure className="book__image--wrapper">
                           <img
                            src={item.imageLink}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            ></img>
                          </figure>
                          <div className="recommended__book--title">{item.title}</div>
                          <div className="recommended__book--author">{item.author}</div>
                          <div className="recommended__book-sub-title">{item.subTitle}</div>
                          <div className="recommended__book--details-wrapper">
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.duration}</div>
                        </div>
                        <div className="recommended__book--details">
                          <div className="recommended__book--details-icon"></div>
                          <div className="recommended__book--details-text">{item.averageRating}</div>
                        </div>
                       </div>
                     </a>
                </div>
              </div>
                </div>
            </div>
          </div>
         ))}
        </div>
      </div>
    </body>
  );
}