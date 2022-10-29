import { memo } from 'react'
import Head from 'next/head'
import { Navbar, SideMenu } from '../ui'
const Layout = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>
      <nav>
        <Navbar></Navbar>
      </nav>
      <SideMenu />
      <main>{children}</main>
      <footer></footer>
    </>
  )
}
export const UserLayout = memo(Layout)
