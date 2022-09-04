const LandingPage = () => {
  return (
    <>
      <div id="MainHomePage">
        <div className="InGamePopUpcontainer">
          <div className="row justify-content-center">
            <div className="Landingmessage card  text-center">BlockStack</div>
            <div className="GoPlayButton card text-center justify-self-end col-5">
              <a href="game" className="GoPlayButton">Play</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
