import { useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/sass/common.scss";
import Head from "next/head";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Layout from "../components/LayoutComps/Layout";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import MaintenanceChecker from "../components/MaintenanceChecker";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <>
        <Head>
          <title>Sapientia</title>
          <meta name="description" content="Discover a smarter, more enjoyable way to learn with Edu.AI. Our automated, human-like personal tutor is revolutionizing the way students engage with educational content. Join the next era of learning today." />
          <meta name="keywords" content="Edu.AI, learning, education, personal tutor, automated tutor, smart learning" />
          <link rel="icon" href="/edudotai-favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="Experience The Next Era Of Learning | Edu.AI" />
          <meta property="og:description" content="Discover a smarter, more enjoyable way to learn with Edu.AI. Our automated, human-like personal tutor is revolutionizing the way students engage with educational content." />
          <meta property="og:image" content="/edudotai-2.png" />
          {/* schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Edu.AI",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "",
                "contactType": ""
              }
            })}
          </script>

          {/* microsoft analytics */}
          {process.env.NODE_ENV == "production" && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `(function(c,l,a,r,i,t,y){ c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "jtu3m7qcwc");`,
              }}
            />
          )}
        </Head>

        <MaintenanceChecker> {/* Wrap your content with MaintenanceChecker */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </MaintenanceChecker>

        {/* Google analytics */}
        {process.env.NODE_ENV == "production" && (
          <>
            <Script
              id={"googlescripts"}
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-ZED3S69W0E');
              `,
              }}
            />
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-ZED3S69W0E"
            ></Script>
          </>
        )}
      </>
    </Provider>
  );
}

export default MyApp;
