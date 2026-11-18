"use client";

import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa6";
import { MdHelpOutline } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import React, { useEffect, useState, use, Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "next/navigation";

export default function PlayerPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { id } = useParams();
  const params = useParams();
  
const audioRef = React.useRef(null);
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

const togglePlayPause = () => {
  if (!audioRef.current) return;
  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    audioRef.current.play();
    setIsPlaying(true);
  }
};

const skipBackward = () => {
  if (!audioRef.current) return;
  audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  setCurrentTime(audioRef.current.currentTime);
};

const skipForward = () => {
  if (!audioRef.current) return;
  audioRef.current.currentTime = Math.min(duration || 0, audioRef.current.currentTime + 10);
  setCurrentTime(audioRef.current.currentTime);
};
  
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

  const skeletonItems = Array.from({ length: 4 });

  const formatTime = (time) => {
    if (typeof time === "number" && !isNaN(time)) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formatMinutes = minutes.toString().padStart(2, "0");
  const formatSeconds = seconds.toString().padStart(2, "0");
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

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

            {isLoading ? (
              skeletonItems.map((_, index) => (
                <div className="row" key={index}>
                    <div
                className="skeleton"
                style={{ width: "48px", height: "48px" }}
              ></div>
                   <div
                className="skeleton"
                style={{ width: "50px", height: "16px", marginBottom: "8px" }}
              ></div>
                   <div
                className="skeleton"
                style={{ width: "100px", height: "16px" }}
              ></div>
                </div>
              ))
            ) : (
              <>

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
        <div className="sidebar__wrapper" style={{ height: "calc(-140px + 100vh)" }}>
          <div className="sidebar__top">
            <a className="sidebar__link--wrapper" href="/for-you">
              <div className="sidebar__link--line active--tab" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <AiOutlineHome className="w-6 h-6" /> For you
              </div>
            </a>
            <a className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line active--tab" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <FaRegBookmark className="w-6 h-6" /> My Library
              </div>
            </a>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line" />
              <div className="sidebar__icon--wrapper" />
              <div className="sidebar__link--text">
                <FaHighlighter className="w-6 h-6" /> Highlights
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
                  <div className="sidebar__icon--wrapper">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  </div>
                  <div className="sidebar__link--text">
                    Logout</div> 
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
          <div className="audio__wrapper">
            <audio
              ref={audioRef}
              src={item.audioLink}
              onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
            }}
            onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
              }
            }}
            onEnded={() => setIsPlaying(false)}
          />
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
                  />
                </figure>
              </figure>
              <Suspense fallback={<p>Loading player data...</p>}>
            <div className="audio__track--details">
                <div className="audio__track--title">{item.title}</div>
                <div className="audio__track--author">{item.author}</div>
              </div>
              </Suspense>
            </div>
            <div className="audio__controls--wrapper">
              <div className="audio__controls">
                  <button
                  type="button"
                  className="audio__controls--btn"
                  onClick={skipBackward}
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" strokeWidth="2" d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path></svg>
                </button>
               <button
                  type="button"
                  className="audio__controls--btn audio__controls--btn-play"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="audio__controls--play-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M176 96h64v320h-64zm96 0h64v320h-64z"></path></svg>
                  ) : (
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="audio__controls--play-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M96 448l320-192L96 64v384z"></path></svg>
                  )}
                </button>
                <button
                  type="button"
                  className="audio__controls--btn"
                  onClick={skipForward}
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#fff" strokeWidth="2" d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"></path></svg>
                </button>
              </div>
            </div>
            <div className="audio__progress--wrapper">
              <div className="audio__time">{formatTime(currentTime)}</div>
              <input
                type="range"
                className="audio__progress--bar"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  if (audioRef.current) {
                    audioRef.current.currentTime = newTime;
                  }
                  setCurrentTime(newTime);
                }}
                style={{
                  background: `linear-gradient(to right, rgb(43, 217, 124) ${
                    duration ? (currentTime / duration) * 100 : 0
                  }%, rgb(109, 120, 125) ${
                    duration ? (currentTime / duration) * 100 : 0
                  }%)`,
                }}
              />
              <div className="audio__time">{formatTime(duration)}</div>
            </div>
          </div>
        </div>
      ))}
      </>
    )}
    </div>
  );
}