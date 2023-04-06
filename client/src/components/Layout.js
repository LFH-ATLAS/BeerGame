import React from "react";

import "../styles/Layout.css";

class Layout extends React.Component {
  render() {
    return (
      <>
        <header>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
          <h1><span className={"orange"}>Welniz</span> | <span className={"italic"}>Beergame</span></h1>
        </header>
        <main>
          { this.props.children }
        </main>
      </>
    )
  }
}

export default Layout