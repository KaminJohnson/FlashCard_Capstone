import React, { useEffect, useState } from "react";

function CardForm({handleSubmit, handleDone, initialFront = "", initialBack = ""}) {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const handleFrontChange = (event) => setFront(event.target.value);
    const handleBackChange = (event) => setBack(event.target.value);

    useEffect(() => {
        setFront(initialFront);
        setBack(initialBack);
    }, [initialFront, initialBack]);

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({front: front, back: back});
    }

    return (
        <form onSubmit={onSubmit}>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="front">Front</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea type="text" id="front" name="front" required value={front} onChange={handleFrontChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="back">Back</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea type="text" id="back" name="back" required value={back} onChange={handleBackChange}/>
                        </td>
                    </tr>
                </tbody>
            <div>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleDone}>Done</button>
            </div>
        </form>
    )
}

export default CardForm;