import home from '../public/NavbarElements/home.svg'
import search from '../public/NavbarElements/search.svg'
import profile from '../public/NavbarElements/profile.svg'
import Link from 'next/link'
export default function Navbar() {
  return (
    <>
      <ol>
        <Link href="/profile">
          <a>
            <li>
              <img src={profile.src} />
            </li>
          </a>
        </Link>
        <Link href="/">
          <a>
            <li>
              <img src={home.src} />
            </li>
          </a>
        </Link>
        <li>
          <Link href="/pets">
            <a>
              <img src={search.src} />
            </a>
          </Link>
        </li>
      </ol>
      <style jsx>{`
        ol {
          padding: 0;
          margin: 0;
          left: 0px;
          top: 0;
          position: fixed;
          max-width: 10%;
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 20%;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          //background-color: #cacaca;
          opacity: 0.6;
        }
        ol:hover {
          opacity: 1;
        }
        li {
          max-width: 100%;
          padding: 25%;
          list-style: none;
          transition: background-color 0.4s ease;
        }
        li:hover {
          background-color: #999284;
          cursor: pointer;
          border-radius: 4px;
        }
        img {
          max-width: 100%;
        }
        @media screen and (max-width: 550px) {
          ol {
            position: fixed;
            flex-direction: row;
            width: 100%;
            max-width: 100%;
            height: 12vh;
            bottom: 0;
            top: auto;
          }
          li {
            padding: 0 2%;
          }
        }
      `}</style>
    </>
  )
}
