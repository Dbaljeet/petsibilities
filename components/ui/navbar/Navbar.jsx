import home from '../../../public/NavbarElements/home.svg'
import search from '../../../public/NavbarElements/search.svg'
import profile from '../../../public/NavbarElements/profile.svg'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'

export function Navbar() {
  return (
    <>
      <Image
        alt="Pestisibilities logo"
        className={styles.image}
        src="/Logo.png"
        width={200}
        height={100}
        layout="fixed"
      />
      <ol>
        <li>
          <Link href="/profile">
            <a>
              <img src={profile.src} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <img src={home.src} />
            </a>
          </Link>
        </li>
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
          background-color: #cf971c;
          margin: 0;
          margin-top: 20px;
          padding: 40px;
          display: flex;
          width: 100%;
          justify-content: center;
        }

        li {
          margin: auto;
          list-style: none;
        }

        img {
          object-fit: cover;
          width: 2.5rem;
        }
        @media screen and (max-width: 550px) {
        }
      `}</style>
    </>
  )
}
