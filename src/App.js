import React from 'react';
import Sidebar from './Sidebar';
import { tree } from '../src/tree'

function App() {
  return (
    <div>
      <Sidebar links={tree} />
    </div>
  );
}

export default App;
