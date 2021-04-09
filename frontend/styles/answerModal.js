import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import axios from 'axios'


const AddAnswerModal = (props) => {
    const {
        show,
        onHide,
        question_id,
    } = props

    const [answer, setAnswer] = useState('')

    const submitAnswer = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/questions/answer', { question_id, answer}) 
        } catch (e) {
            console.log(e)
        }
        onHide()
    }

    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Body>
                <form>
                    <label for="Answer">Answer text:</label>
                    <input type="text" id="answer" name="answer"
                    onChange={(e) => setAnswer(e.target.value)}
                    />
                    <button onClick={submitAnswer}> Submit </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default AddAnswerModal