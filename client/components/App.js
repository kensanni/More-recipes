import React from 'react';
import Header from './Header'

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired
// };

export default App;