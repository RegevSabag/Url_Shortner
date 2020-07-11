import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Table from './components/Table';
import Input from './components/Input';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/')
    .then(function (response) {
      setUrls(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);

  const handleOnClickShorten = () => {
    if(input)
    {
      axios.post('http://localhost:4000/shortener',{url:input})
      .then(function (response) {
        if(response.data.type === 'success'){
          setUrls([...urls,response.data.data ]);
          setInput('');
        }
        else{
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        alert(error);
      })
    }
    else {
      alert("Text input is required.");
    }
  }

  return (
    <div className="appContainer">
      <div className="mainContainer">
        <span className="title">Url Shortner</span>
        <span className="subTitle">The base URL shortening service</span>
        <Input input={input} handleOnClickShorten={handleOnClickShorten} setInput={setInput} />
        <Table urls={urls}/>
      </div>
    </div>
  );
}

export default App;
