import React, { useState } from 'react'
import { useAxiosWithAuth } from '../hooks'
import { useHistory } from 'react-router-dom'

export const AddColorForm = ({ setColorList }) => {

    const [newColor, setNewColor] = useState({
        color: "",
        code: {
            hex: ""
        },
        id: ""
    })

    const axios = useAxiosWithAuth()
    const history = useHistory()

    const onChangeColor = event => {
        setNewColor({
            ...newColor,
            color: event.target.value
        })
    }

    const onChangeHex = event => {
        setNewColor({
            ...newColor,
            code: {
                hex: event.target.value
            }
        })
    }

    const onSubmit = async event => {
        event.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:5000/api/colors', newColor)
            console.log('post data', data)
            setColorList(data)
        } catch (e) {
            console.log(e)
            history.push('/')
        }
        setNewColor({
            color: "",
            code: {
                hex: "",
            }
        })
    }

    return (
        <>
            <h2>Add New Color</h2>
            <form onSubmit={onSubmit}>
                <input onChange={onChangeColor} value={newColor.color} name="color" placeholder="color" />
                <input onChange={onChangeHex} value={newColor.code.hex} name="hex" placeholder="hex" />
                <input type="submit" value="submit" />
            </form>
        </>
    )
}