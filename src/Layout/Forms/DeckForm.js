import React, { useEffect, useState } from "react";

function DeckForm({handleSubmit, handleCancel, initialName = "", initialDescription = ""}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleNameChange = (event) => setName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);

    useEffect(() => {
        setName(initialName);
        setDescription(initialDescription);
    }, [initialName, initialDescription]);

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({name: name, description: description});
    }

    return (
        <form onSubmit={onSubmit}>
        <table>
            <tbody>
                <tr>
                    <td>
                        <label htmlFor="name">Name</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" id="name" name="name" required value={name} onChange={handleNameChange}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="description">Description</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <textarea type="text" id="description" style={{width: "500px", height: "100px"}} name="description" value={description} required onChange={handleDescriptionChange}/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
    </form>
    )
}

export default DeckForm;