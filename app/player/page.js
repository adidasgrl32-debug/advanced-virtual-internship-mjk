"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline, MdLogin } from "react-icons/md";

export default function playerPage() {

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
            <div className="summary">
              <div className="audio__book--spinner">
                <svg>spinner</svg>
              </div>
              <div className="audio__wrapper">
                <div className="audio__track--wrapper">
                  <figure className="audio__track--image-mask">
                    <div className="skeleton" style="width:48px;height:48px"></div>
                  </figure>
                  <div className="audio__track--details-wrapper">
                    <div className="skeleton" style="width:50px;height:16px;margin-bottom:8px"></div>
                    <div className="skeleton" style="width:100px;height:16px"></div>
                  </div>
                </div>
                
              </div>
            </div>
        </div>
      </div>
    </body>
  );
}