import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function App() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Calendar onChange={onChange} value={value} />
        </div>
      </header>
    </div>
  );
}

export default App;
