import React, {Component} from 'react';

export default class Dashboard extends Component{
        constructor(props) {
          super(props);
          this.state = {
            error: null,
            isLoaded: false,
            items: []
          };
        }
      
        componentDidMount() {
          fetch("http://localhost:5000/user/sortbydate")
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
        }
      
        render() {
          const { error, isLoaded, items } = this.state;
          if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12 col-sm-12 col-md-12">
                        <div className="row">
                        <div className="col"><h2>This Week Movie</h2></div>
                        <div className="col"><div class="dropdown float-right">
                            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Sorted By
                            <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#">Release Date</a></li>
                                <li><a href="#">Rattings</a></li>
                            </ul>
                            </div>
                            </div>
                         </div>
                                        <ul class="list-group">
                                            {items.map(item => (
                                            <li key={item.movieName} class="list-group-item">
                                            {item.movieName}                
                                            </li>
                                            ))}
                                        </ul>
                                </div>
                        </div>
                    
                    </div>
              
            );
          }
        }
}