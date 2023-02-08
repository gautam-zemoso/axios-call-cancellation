import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiService } from "./api-service";

let source;

class Pictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      isLoading: false
    };

    source = axios.CancelToken.source();
  }

  fetchPictures = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      apiService.fetchPictures(source.token).then((res) => {
        if (res) {
          this.setState({ pictures: res.data.results, isLoading: false });
        }
        if (!res) {
          this.setState({ isLoading: false });
        }
      });
    }, 2000);
  };

  componentWillUnmount() {
    if (source) {
      source.cancel("Picture Component got unmounted");
    }
  }

  render() {
    const { pictures, isLoading } = this.state;
    return (
      <div>
        <Link className="links" to="/">
          Go to Landing
        </Link>
        <Link className="links" to="/todos">
          Go to Todos
        </Link>
        {isLoading && <h2>Loading...</h2>}
          <div>
          <button className="btn" onClick={() => this.fetchPictures()}>
              Fetch Pictures
            </button>
            {!isLoading && (<div className="picture-block">
              {pictures.map((picture) => {
                return (
                  <div key={picture.id} className="img-container">
                    <img src={picture.urls.full} alt="office" />
                  </div>
                );
              })}
            </div>
            )}
            
          </div>
      </div>
    );
  }
}

export default Pictures;
