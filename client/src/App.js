import {useState , useEffect} from 'react'
import "./App.css"
function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [prevAnswer, setprevAnswer] = useState('')

  const handleSubmit= (e) => {
      e.preventDefault();
      setQuestion(e.target.elements.question.value);
     // console.log(answer);
    }
  useEffect(()=> {
    const getAnswer = async () => {
    let response=  await fetch (`http://127.0.0.1:5000/ask?q=${question}`)
    response =await response.json ()
    setAnswer(response.answers)
    setprevAnswer(prev => prev + answer)
    }
    question !== '' && getAnswer()
    setQuestion('');
  },[question]);

  return (
    <>
      <pre className='answer-area'>{prevAnswer}<br/> <strong>{answer}</strong> </pre>
      <form onSubmit={handleSubmit}>
        <input className='q' name="question" type="text" />
        <input className='a' type="submit" value="Ask" />
      </form>
    </>
  );
}

export default App;