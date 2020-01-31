import React, { useState } from "react";
import { useAxiosWithAuth } from "../hooks";
import { useHistory } from 'react-router-dom'
import { AddColorForm } from "./AddColorForm";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, setColorList, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const axios = useAxiosWithAuth()
  const history = useHistory()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = async e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log('colorToEdit')
    try {
      const { data } = await axios.put('http://localhost:5000/api/colors/' + colorToEdit.id, colorToEdit)
      console.log('color edit data', data)
      setColorList(colors.map(c => {
        if(c.id === data.id){
          return data
        }
        return c
      }))
    } catch(e) {
      console.log(e)
      history.push('/')
    }
  };

  const deleteColor = async ({ id }) => {
    try {
      const { data } = await axios.delete('http://localhost:5000/api/colors/' + id)
      console.log('delete data', data)
      setColorList(colors.filter(c => c.id !== data))
    } catch (e) {
      console.log(e)
      history.push('/')
    }
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <AddColorForm setColorList={setColorList}/>
      <div className="spacer" />
    </div>
  );
};

export default ColorList;
