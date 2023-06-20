import "./App.css";
import ImageGallery from "./components/ImageGallery";

function App() {
  return (
    <>
      <h1>Flickr Image Gallery</h1>
      <div className="card">
        <p>Throttle the network to observe the loading effect.</p>
      </div>
      <ImageGallery />
    </>
  );
}

export default App;
