"use client" 

import Image from "next/image";
import Link from "next/link";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf, BsPerson } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import { useState } from "react";

export default function Home() {
const [isModalOpen, setIsModalOpen] = useState(false);
const [isResetyourpasswordModalOpen, setIsResetyourpasswordModalOpen] = useState(false);
const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <div className="auth__wrapper">
          <div className="auth">
            {isResetyourpasswordModalOpen ? (
              <>
                <div className="auth__content">
                  <div className="auth__title">Reset your password</div>
                  <form className="auth__main--form">
                    <input
                      className="auth__main--input"
                      type="text"
                      placeholder="Email address"
                    />
                    <button className="btn" type="submit">
                      <span>Send reset password link</span>
                    </button>
                  </form>
                </div>
                <button
                  type="button"
                  onClick={() => setIsResetyourpasswordModalOpen(false)}
                  className="auth__switch--btn"
                >
                  Go to login
                </button>
              </>
            ) : isSignupModalOpen ? (
              <>
                <div className="auth__content">
                  <div className="auth__title">Sign up to Summarist</div>
                  <button
                    type="button"
                    className="btn google__btn--wrapper"
                    onClick={() => (window.location.href = "/for-you")}
                  >
                    <figure className="google__icon--mask">
                      <Image
                        src="/google.png"
                        width={50}
                        height={50}
                        style={{ width: "50%", height: "auto" }}
                        alt="Google icon"
                      />
                    </figure>
                    <div>Sign up with Google</div>
                  </button>
                  <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                  </div>
                  <form className="auth__main--form">
                    <input
                      className="auth__main--input"
                      type="text"
                      placeholder="Email Address"
                    />
                    <input
                      className="auth__main--input"
                      type="password"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={() => (window.location.href = "/for-you")}
                    >
                      <span>Sign up</span>
                    </button>
                  </form>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSignupModalOpen(false)}
                  className="auth__switch--btn"
                >
                  Already have an account?
                </button>
              </>
            ) : (
              <>
                <div className="auth__content">
                  <div className="auth__title">Log in to Summarist</div>
                  <button
                    type="button"
                    className="btn guest__btn--wrapper"
                    onClick={() => (window.location.href = "/for-you")}
                  >
                    <figure className="google__icon--mask guest__icon--mask">
                      <BsPerson />
                    </figure>
                    <div>Login as a Guest</div>
                  </button>
                  <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                  </div>
                  <button
                    type="button"
                    className="btn google__btn--wrapper"
                    onClick={() => (window.location.href = "/for-you")}
                  >
                    <figure className="google__icon--mask">
                      <Image
                        src="/google.png"
                        width={50}
                        height={50}
                        style={{ width: "50%", height: "auto" }}
                        alt="Google icon"
                      />
                    </figure>
                    <div>Login with Google</div>
                  </button>
                  <div className="auth__separator">
                    <span className="auth__separator--text">or</span>
                  </div>
                  <form className="auth__main--form">
                    <input
                      className="auth__main--input"
                      type="text"
                      placeholder="Email Address"
                    />
                    <input
                      className="auth__main--input"
                      type="password"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={() => (window.location.href = "/for-you")}
                    >
                      <span>Login</span>
                    </button>
                  </form>
                </div>

                <div
                  className="auth__forgot--password"
                  style={{ textAlign: "center", width: "100%", display: "block" }}
                  onClick={() => setIsResetyourpasswordModalOpen(true)}
                >
                  Forgot your password?
                </div>

                <button
                  type="button"
                  onClick={() => setIsSignupModalOpen(true)}
                  className="auth__switch--btn"
                >
                  Don't have an account?
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setIsResetyourpasswordModalOpen(false);
                setIsSignupModalOpen(false);
              }}
              className="auth__close--btn"
              aria-label="Close modal"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={200}
                height={46}
              />
            </Link>
          </figure>
          <ul className="nav__list--wrapper">
            <li className="nav__list nav__list--login" onClick={() => setIsModalOpen(true)}>Login</li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>

      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" />
                  in less time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,
                  <br className="remove--tablet" />
                  individuals who barely have time to read,
                  <br className="remove--tablet" />
                  and even people who don’t like to read.
                </div>
                <div className="landing__btn--wrapper">
                <button className="btn home__cta--btn" onClick={() => setIsModalOpen(true)}>Login</button>
            </div>
              </div>
              <figure className="landing__image--mask">
                <img src="/landing.png" alt="landing" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <div className="row">
            <div className="section__title">
              Understand books in few minutes
            </div>
            <div className="features__wrapper">
              <div className="features">
                <div className="features__icon">
                  <AiFillFileText />
                </div>
                <div className="features__title">Read or listen</div>
                <div className="features__sub--title">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className="features">
                <div className="features__icon">
                  <AiFillBulb />
                </div>
                <div className="features__title">Find your next read</div>
                <div className="features__sub--title">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className="features">
                <div className="features__icon">
                  <AiFillAudio />
                </div>
                <div className="features__title">Briefcasts</div>
                <div className="features__sub--title">
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>

            <div className="statistics__wrapper">
              <div className="statistics__content--header">
                <div className="statistics__heading">
                  Enhance your knowledge
                </div>
                <div className="statistics__heading">
                  Achieve greater success
                </div>
                <div className="statistics__heading">Improve your health</div>
                <div className="statistics__heading">
                  Develop better parenting skills
                </div>
                <div className="statistics__heading">Increase happiness</div>
                <div className="statistics__heading">
                  Be the best version of yourself!
                </div>
              </div>
              <div className="statistics__content--details">
                <div className="statistics__data">
                  <div className="statistics__data--number">93%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>significantly increase</b> reading
                    frequency.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">96%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>establish better</b> habits.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">90%</div>
                  <div className="statistics__data--title">
                    have made <b>significant positive</b> change to their lives.
                  </div>
                </div>
              </div>
            </div>

            <div className="statistics__wrapper">
              <div className="statistics__content--details statistics__content--details-second">
                <div className="statistics__data">
                  <div className="statistics__data--number">91%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>report feeling more productive</b>{" "}
                    after incorporating the service into their daily routine.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">94%</div>
                  <div className="statistics__data--title">
                    of Summarist members have <b>noticed an improvement</b> in
                    their overall comprehension and retention of information.
                  </div>
                </div>
                <div className="statistics__data">
                  <div className="statistics__data--number">88%</div>
                  <div className="statistics__data--title">
                    of Summarist members <b>feel more informed</b> about current
                    events and industry trends since using the platform.
                  </div>
                </div>
              </div>
              <div className="statistics__content--header statistics__content--header-second">
                <div className="statistics__heading">Expand your learning</div>
                <div className="statistics__heading">Accomplish your goals</div>
                <div className="statistics__heading">
                  Strengthen your vitality
                </div>
                <div className="statistics__heading">
                  Become a better caregiver
                </div>
                <div className="statistics__heading">Improve your mood</div>
                <div className="statistics__heading">
                  Maximize your abilities
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews">
        <div className="row">
          <div className="container">
            <div className="section__title">What our members say</div>
            <div className="reviews__wrapper">
              <div className="review">
                <div className="review__header">
                  <div className="review__name">Hanna M.</div>
                  <div className="review__stars">
                    <BsStarFill />
                  </div>
                </div>
                <div className="review__body">
                  This app has been a <b>game-changer</b> for me! It's saved me
                  so much time and effort in reading and comprehending books.
                  Highly recommend it to all book lovers.
                </div>
              </div>
              <div className="review">
                <div className="review__header">
                  <div className="review__name">David B.</div>
                  <div className="review__stars">
                    <BsStarFill />
                  </div>
                </div>
                <div className="review__body">
                  I love this app! It provides{" "}
                  <b>concise and accurate summaries</b> of books in a way that
                  is easy to understand. It's also very user-friendly and
                  intuitive.
                </div>
              </div>
              <div className="review">
                <div className="review__header">
                  <div className="review__name">Nathan S.</div>
                  <div className="review__stars">
                    <BsStarFill />
                  </div>
                </div>
                <div className="review__body">
                  This app is a great way to get the main takeaways from a book
                  without having to read the entire thing.{" "}
                  <b>The summaries are well-written and informative.</b>
                  Definitely worth downloading.
                </div>
              </div>
              <div className="review">
                <div className="review__header">
                  <div className="review__name">Ryan R.</div>
                  <div className="review__stars">
                    <BsStarFill />
                  </div>
                </div>
                <div className="review__body">
                  If you're a busy person who{" "}
                  <b>loves reading but doesn't have the time</b> to read every
                  book in full, this app is for you! The summaries are thorough
                  and provide a great overview of the book's content.
                </div>
              </div>
            </div>
            <div className="reviews__btn--wrapper">
              <button className="btn home__cta--btn" onClick={() => setIsModalOpen(true)}>Login</button>
            </div>
          </div>
        </div>
      </section>

      <section id="numbers">
        <div className="container">
          <div className="row">
            <div className="section__title">
              Start growing with Summarist now
            </div>
            <div className="numbers__wrapper">
              <div className="numbers">
                <div className="numbers__icon">
                  <BiCrown />
                </div>
                <div className="numbers__title">3 Million</div>
                <div className="numbers__sub--title">
                  Downloads on all platforms
                </div>
              </div>
              <div className="numbers">
                <div className="numbers__icon numbers__star--icon">
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className="numbers__title">4.5 Stars</div>
                <div className="numbers__sub--title">
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className="numbers">
                <div className="numbers__icon">
                  <RiLeafLine />
                </div>
                <div className="numbers__title">97%</div>
                <div className="numbers__sub--title">
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <div className="container">
          <div className="row">
            <div className="footer__top--wrapper">
              <div className="footer__block">
                <div className="footer__link--title">Actions</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Summarist Magazine</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Cancel Subscription</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Help</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Contact us</a>
                  </div>
                </div>
              </div>
              <div className="footer__block">
                <div className="footer__link--title">Useful Links</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Pricing</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Summarist Business</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Gift Cards</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className="footer__block">
                <div className="footer__link--title">Company</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">About</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Careers</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Partners</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className="footer__block">
                <div className="footer__link--title">Other</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Sitemap</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Legal Notice</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Terms of Service</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer__copyright--wrapper">
              <div className="footer__copyright">
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}