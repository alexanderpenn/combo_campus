import React, { useState, useEffect,  } from 'react'
import { useHistory, Link } from "react-router-dom"
import axios from 'axios'
import AddQuestionModal from '../styles/questionModal'
import AddAnswerModal from '../styles/answerModal'



const Home = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [questions, setQuestions] = useState([])
    const [username, setUsername] = useState('')
    const [isQuestionModalDisplayed, displayQuestionModal] = useState(false)
    const [isAnswerModalDisplayed, displayAnswerModal] = useState(false)
    const [questionId, setQuestionId] = useState('')

    const fetchUsername = async () => {
        const response = await axios.get('/account/username')
        setUsername(response.data.username)
    }

    const fetchQuestions = async () => {
        const response = await axios.get('/api/questions')
        console.log(response);
        setQuestions(response.data)
    }

    const fetchLoginStatus = async () => {
        try {
            await axios.get('/account/login_status')
            setLoggedIn(true)
            await fetchUsername();
        } catch (e) {
            setLoggedIn(false)
        }
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
            fetchLoginStatus()
            fetchQuestions()
          }, 2000)
          return () => clearInterval(intervalID)
    }, [])

    const addQuestion = (e) => {
        e.preventDefault()
        displayQuestionModal(true);
    }

    const addAnswer = (e, question_id) => {
        e.preventDefault()
        setQuestionId(question_id)
        displayAnswerModal(true)
    }

    const logout = async (e) => {
        e.preventDefault()
        const { status } = await axios.post('/account/logout')
        if (status === 200) {
            alert('Successfully logged out')
            setLoggedIn(false)
            setUsername('')
        } else {
            alert('Unable to log out')
        }
    }

    const loggedInHome = () => {
        return (
            <div>
                <AddQuestionModal
                    show={isQuestionModalDisplayed}
                    onHide={() => displayQuestionModal(false)}
                />
                <AddAnswerModal
                    show={isAnswerModalDisplayed}
                    onHide={() => displayAnswerModal(false)}
                    question_id={questionId}
                />

                <p>Hi { username }! </p>
                <button onClick={logout} >Log Out</button>
                <br />
                {
                    questions.map((element) => {
                        return (
                        <div key={element._id}> 
                            <p>Question: { element.questionText }</p>
                            <p>Author: { element.author }</p>
                            <p>Answer: { element.answer }</p>
                            <button onClick={(e) => addAnswer(e, element._id)} >Reply</button>
                            <hr />
                        </div>)
                    })
                }
                <button onClick={addQuestion} >Add New Question</button>
            </div>
        )

    }

    const loggedOutHome = () => {
        return (
            <div>
                <Link to="/login">Log in to submit a question</Link>
                {
                    questions.map((element) => {
                        return (
                        <div key={element._id}> 
                            <p>Question: { element.questionText }</p>
                            <p>Author: { element.author }</p>
                            <p>Answer: { element.answer }</p>
                            <hr />
                        </div>)
                    })
                }
            </div>
        )
    }

    return (loggedIn ? loggedInHome() : loggedOutHome()) 
}

export default Home