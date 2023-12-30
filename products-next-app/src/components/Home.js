import '../styles/Home.css'

function Home() {
  return (
    <div className="home-container">
      <h2 className="page-header">Home</h2>
      <div className='info-container'>
        <p className='info'>Welcome to our fake store application.</p>
        <p className='info'>By using navigation bar on top side of this bage you can view items and read about what this is.</p>
        <p className='info'>All pictures that are used in this application are free-to-use pictures from Pixabay</p>
      </div>
    </div>
  );
}

export default Home;