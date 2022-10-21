import React from "react";

import "../styles/Layout.css";

class Layout extends React.Component {
  render() {
    return (
      <>
        <header>
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