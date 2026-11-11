"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import { MdLogin } from "react-icons/md";

export default function foryouPage() {

  return (
    <>
    <body>
      <div id="next">
        <div className="wrapper">
          <div className="search__background">
            <div className="search__wrapper">
              <figure>
                <img src="logo" alt="" />
              </figure>
              <div className="search__content">
                <div className="search">
                  <div className="search__input--wrapper">
                    <input className="search__input" placeholder="Search for books" type="text" value />
                   <div className="search__icon">
                    <button></button>
                   </div>
                  </div>
                </div>
                <div className="sidebar__toggle--btn">
                  <button
                    className="☰">
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
                  <div className="sidebar__link--line active--tab"></div>
                 <div className="sidebar__icon--wrapper">
                 </div>
                 <div className="sidebar__link--text">
                  <AiOutlineHome className="w-6 h-6" /> For you</div>
                </a>
                  <a className="sidebar__link--wrapper" href="/for-you">
                  <div className="sidebar__link--line active--tab"></div>
                 <div className="sidebar__icon--wrapper">
                 </div>
                 <div className="sidebar__link--text">
                 <FaRegBookmark /> My Library</div>
                </a>
                <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                  <div className="sidebar__link--line"></div>
                 <div className="sidebar__icon--wrapper">
                 </div>
                 <div className="sidebar__link--text">
                  <FaHighlighter />  Highlights</div>
                </div>
                <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                  <div className="sidebar__link--line"></div>
                 <div className="sidebar__icon--wrapper"></div>
                  <div className="sidebar__link--text">
                    <IoMdSearch className="w-6 h-6" /> Search</div>
                </div>
              </div>
              <div className="sidebar__bottom">
                 <a className="sidebar__link--wrapper" href="/settings">
                  <div className="sidebar__link--line"></div>
                 <div className="sidebar__icon--wrapper">
                 </div>
                 <div className="sidebar__link--text">
                  <IoSettingsOutline className="w-6 h-6" /> Settings</div>
                </a>
                   <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                  <div className="sidebar__link--line"></div>
                 <div className="sidebar__icon--wrapper">
                 </div>
                 <div className="sidebar__link--text">
                  <MdHelpOutline className="w-6 h-6" />  Help & Support</div>
                </div>
                <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                  <div className="sidebar__link--line"></div>
                 <div className="sidebar__icon--wrapper"></div>
                  <div className="sidebar__link--text">
                    <MdLogin />  Login</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="for-you__wrapper">
                <div className="for-you__title">Selected just for you</div>
                 <audio></audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </>
  )
}