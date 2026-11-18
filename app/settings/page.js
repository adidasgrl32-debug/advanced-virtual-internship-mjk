"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline, MdLogin } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsPage() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      axios
        .get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`,
        )
        .then((response) => {
          setSearchResults(response.data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  if (error) return <p>Error: {error}</p>;
 
   return (
     <>
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
          <div className="container">
            <div className="row">
              <div className="section__title page__title">Settings</div>
                <div className="settings__login--wrapper">
                  <img alt="login" src="/login.png" />
                  <div className="settings__login--text">Log in to your account to see your details.</div>
                  <button className="btn settings__login--btn">Login</button>
                </div>
            </div>
          </div>
          </div>
    </>
  );
}