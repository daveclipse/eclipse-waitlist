import "@/styles/globals.css";

console.log("[_app.js] Module loaded at", new Date().toISOString());

export default function App({ Component, pageProps }) {
  console.log("[_app.js] App component rendering");
  return <Component {...pageProps} />;
}
