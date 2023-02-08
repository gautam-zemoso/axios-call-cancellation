import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiService } from "./api-service";

let source;

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isLoading: false
    };

    source = axios.CancelToken.source();
  }

  fetchTodos = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      apiService.fetchTodos(source.token).then((res) => {
        if (res) {
          this.setState({ todos: res.data.slice(1, 10), isLoading: false });
        }
        if (!res) {
          this.setState({ isLoading: false });
        }
      });
    }, 2000);
  };

  componentWillUnmount() {
    if (source) {
      source.cancel("Todos Component got unmounted");
    }
  }

  render() {
    const { todos, isLoading } = this.state;
    return (
      <div>
        <Link className="links" to="/">
          Go to Landing
        </Link>
        <Link className="links" to="/pictures">
          Go to pictures
        </Link>
        {isLoading && <h2>Loading...</h2>}
        {!isLoading && (
          <div>
            {todos.map((todo) => {
              return <p key={todo.id}>{todo.title}</p>;
            })}
            <button className="btn" onClick={() => this.fetchTodos()}>
              Fetch Todos
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Todos;
