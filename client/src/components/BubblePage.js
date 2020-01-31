import React, { useState, useEffect } from "react";
import { useAxiosWithAuth } from '../hooks'
import { useHistory } from 'react-router-dom'

import { Bubbles } from "./Bubbles";
import ColorList from "./ColorList";

export const BubblePage = () => {
  const axios = useAxiosWithAuth()
  const history = useHistory()
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    const getColors = async () => {
      try {
        const { data } = await axios('http://localhost:5000/api/colors')
        setColorList(data)
      } catch (e) {
        console.log(e)
        history.push('/')
      }
    }
    getColors()
  }, [])
  return (
    <>
      <h1>BUBBLES</h1>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

