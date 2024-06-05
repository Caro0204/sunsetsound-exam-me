import "./styles/globals.css";
import "./styles/reset.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Sunset sound festival",
  description: "Music festival",
};

export default async function RootLayout({ children }) {
  {
    return (
      <html lang="en">
        <head>
          <meta name="robots" content="noindex"></meta>
          <link rel="stylesheet" href="https://use.typekit.net/svd4gfu.css" />
          <link rel="icon" type="image/svg+xml" href="favicon-s_sound.svg" />
        </head>
        <body>
          <Header></Header>
          <main>{children}</main>
          <Footer></Footer>
        </body>
      </html>
    );
  }
}
