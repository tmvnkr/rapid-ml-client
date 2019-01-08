import React from 'react';

function HomePage({ history }) {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <div className="content">
              <i>
                <u>>R</u>APID<u>>M</u>L
              </i>
            </div>
          </h1>
          <h2>Use the power of machine learning to tag your images!</h2>
          <div
            onClick={() => history.push('/collections')}
            className="ui huge white inverted button"
          >
            Get Started
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        Web application made by Marin Codrut and Tim Vaneker
      </div>
    </div>
  );
}

export default HomePage;
