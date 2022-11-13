import React from 'react' 
import Question from './component/Question'
import Intro from './component/Intro'
import { nanoid } from 'nanoid'

export default function App(){
    const [introState, setIntroState] = React.useState(true)
    const [questions, setQuestions] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [answeredQuestions, setAnsweredQuestions] = React.useState(0)
    const [checked, setChecked] = React.useState(false)
    
    React.useEffect(function() {
       fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
    }, [])
    
    function newQuestions() {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        setCorrectAnswers(0)
        setAnsweredQuestions(0)
        const changeButtons = document.querySelectorAll('.answers button')
        for (const button of changeButtons) {
            button.className = ''
        }
        setChecked(false)
    }
    
    const quizQuestions = questions.map(result => {
            return (<Question result={result} question={questions}  answerQuestion={answerQuestion} />)
    })
    
     function answerQuestion(event, value){
        setAnsweredQuestions(prev => prev + 1)
        value === 'correct' && setCorrectAnswers(prev => prev + 1)
     }
    
    function startQuiz() {
        setIntroState(false)
    }
    
    function checkAnswers() {
        const incorrectAnswers = document.querySelectorAll('button[value=incorrect]')
        for (const answer of incorrectAnswers){
            answer.className = 'btn-disable'
        }
        const correctAnswers = document.querySelectorAll('button[value=correct]')
        for (const answer of correctAnswers){
            answer.className = 'correctClicked'
        }
        setChecked(true)
    }
     
    return (
        <main>
            {introState ? <div className='questions'><img className='blob1'src="images/blob1.svg"/>
            <img className='blob2'src="images/blob2.svg"/><Intro startQuiz={startQuiz}/></div> :
            <div className='questions'>
                <img className='blob1-start'src="images/blob1.svg"/>
                <img className='blob2-start'src="images/blob2.svg"/>
                {quizQuestions}
                {answeredQuestions === 5 ? <div class='score'><h2 className='finalScore' >You have Scored {correctAnswers}/5</h2><button className='qbutton' onClick={newQuestions}>Play Again</button></div> : checked === false ? <button className='qbutton' onClick={checkAnswers}>Check Answers</button> : <button className='qbutton' onClick={newQuestions}>Play Again</button>}
            </div>}
        </main>  
        )
}