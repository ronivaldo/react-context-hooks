import React, { Component, useState } from 'react';

const NewSongForm = ({ addSong }) => {
    // state for title
    const [title, setTitle] = useState('');
    // fire a function when user types
    // e.target.value keeps the value of the element
    // prevent submitting the form
    const handleSubmit = (e) => {
        e.preventDefault();
        addSong(title);
        setTitle('');
    }
    // <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
    // value={title} -> reads the value
    // onChange={(e) => setTitle(e.target.value)} -> sets the value
    return (
        <form onSubmit={handleSubmit}>
            <label>Song name:</label>
            <input type="text" value={title} required onChange={(e) => setTitle(e.target.value)} />
            <input type="submit" value="add song" />
        </form>

    );
}

export default NewSongForm;