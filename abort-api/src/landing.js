import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

let source;
let usersEndpoint = "https://jsonplaceholder.typicode.com/users";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false
    };

    source = axios.CancelToken.source();
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    setTimeout(() => {
      this.setState({ isLoading: true });
      axios
        .get(usersEndpoint, {
          cancelToken: source.token
        })
        .then((res) => {
          this.setState({ data: res.data, isLoading: false });
        })
        .catch((e) => {
          console.log(e.message);
        });
    }, 2000);
  };

  componentWillUnmount() {
    if (source) {
      source.cancel("Landing Component got unmounted");
    }
  }

  render() {
    const { data, isLoading } = this.state;
    return (
      <div>
        {isLoading && <h2>Loading...</h2>}
        {!isLoading && (
          <div>
            <Link className="links" to="/todos">
              Go to Todos
            </Link>
            <Link className="links" to="/pictures">
              Go to Pictures
            </Link>
            <h4>The axios request is made from inside this component</h4>
            {data.length > 0 &&
              data.map((item) => {
                return <p key={item.id}>{item.name}</p>;
              })}
          </div>
        )}
      </div>
    );
  }
}

export default Landing;
