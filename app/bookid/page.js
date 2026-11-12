"use client"

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline, MdLogin } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function bookidPage() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    }, [id]);
  
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
              <audio></audio>
              <div className="container">
                <div className="inner__wrapper">
                  <div className="inner__book">{item.id}
                    <div className="inner-book__title">{item.title}</div>
                    <div className="inner-book__author">{item.author}</div>
                    <div className="inner-book__sub--title">{item.subTitle}</div>
                    <div className="inner-book__wrapper">
                      <div className="inner-book__description--wrapper">
                        <div className="inner-book__description">
                          <div className="inner-book__icon">
                            <image><CiStar /> </image>
                          </div>
                          <div className="inner-book__overall--rating">{item.averageRating}</div>
                            <div className="inner-book__total--rating">{item.totalRating}</div>
                        </div>
                        <div className="inner-book__description">
                          <image><CiClock2 /> </image>
                        </div>
                          <div className="inner-book__duration">{item.duration}00.00</div>
                      </div>
                        <div className="inner-book__description">
                          <div className="inner-book__icon">
                            <image><HiOutlineMicrophone /></image>
                          </div>
                          <div className="inner-book__type">{item.type}</div>
                      </div>
                          <div className="inner-book__description">
                          <div className="inner-book__icon">
                            <image><HiOutlineLightBulb /> </image>
                          </div>
                          <div className="inner-book__key--ideas">{item.keyIdeas}</div>
                      </div>
                    </div>
                  </div>
                  <div className="inner-book__read--btn-wrapper">
                    <button className="inner-book__read--btn">
                      <div className="inner-book__read--icon">
                        <image></image>
                      </div>
                        <div className="inner-book__read--text">Read</div>
                    </button>
                  </div>
                    <div className="inner-book__bookmark">
                      <div className="inner-book__bookmark-icon">
                        <image><FaRegBookmark /> </image>
                      </div>
                      <div className="inner-book__bookmark--text">Add title to My Library</div>
                    </div>
                      <div className="inner-book__secondary--title">What's it about?</div>
                      <div className="inner-book__tags--wrapper"></div>
                      <div className="inner-book__book--description">{item.bookDescription}</div>
                        <h2 className="inner-book__secondary--title">About the author</h2>
                       <div className="inner-book__author--description">{item.authorDescription}
                       </div>
                </div>
                  <div className="inner-book--img-wrapper">
                    <figure className="book__image--wrapper">{item.imageLink}
                      style="height: 300px; width: 300px; min-width: 300px;"
                    </figure>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </body>
  );
}