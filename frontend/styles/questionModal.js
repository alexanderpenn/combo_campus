import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'

const AddQuestionModal = (props) => {
    const {
        show,
        onHide,
    } = props

    const [questionText, setQuestionText] = useState('')

    const submitQuestion = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/questions/add', {questionText}) 
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
                    <label for="question">Question text:</label>
                    <input type="text" id="question" name="question"
                    onChange={(e) => setQuestionText(e.target.value)}
                    />
                    <button onClick={submitQuestion}> Submit </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default AddQuestionModal