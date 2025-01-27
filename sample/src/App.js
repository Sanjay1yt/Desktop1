import { React, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import {
  fetchData,
  setSearchKey,
  setSelectKey,
  fetchUserDetails
} from './action'
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import debounce from "lodash.debounce";
import CircularProgress from '@mui/material/CircularProgress';

export default function Counter() {
  const dispatch = useDispatch()

  const { userList, searchKey, selectKey, userNames ,isLoading } = useSelector((state) => state)

  const searchUser = (e) => {
    const userInput = e.target.value.replace(/\s+/g, '').toLocaleLowerCase()
    deBounceDispatch(userInput)
  };

  const deBounceDispatch = debounce((input) => {
    dispatch(setSearchKey(input))
    dispatch(setSelectKey(''))
  }, 500)

  const selectUserTopic = (e) => {
    const selectedValue = e.target.value; 
    dispatch(setSelectKey(selectedValue))
  };

  const filterBasedOnSearch = () => {
    console.log({ userList })
    let filteredData = userList
    if (searchKey) {
      filteredData = filteredData.filter(({ userId ,title }) => String(userId) === String(searchKey) || title.replace(/\s+/g, '').toLocaleLowerCase().includes(searchKey) )
      console.log({ filteredData })

    }
    if (selectKey) {
      filteredData = filteredData.filter(({ id }) => id === selectKey)
    }
    return filteredData
  }

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchUserDetails())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='main-flex-container'>

      <h1>User List</h1>

      <div className='flex-container' >
{/* validation pending for user id is pending */}
        <TextField

          id="outlined-basic"

          onChange={searchUser}

          variant="outlined"

          fullWidth

          label="Search user ID and Title"

        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select User Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectKey || ""}
            label="User Name"
            onChange={selectUserTopic}
          >
            {userNames.map((ele) => (<MenuItem value={ele.id}>{ele.name}</MenuItem>))}
          </Select>
        </FormControl>

      </div>

      <div className='grid'>
        {isLoading ? <CircularProgress/> : filterBasedOnSearch().map((ele) => (<div key={ele.id} className='grid-item'>
          <div><span className="bold">Name :</span>  {ele.userId}</div>
          <div><span className="bold">Title :</span>  {ele.title}</div>
        </div>))}
      </div>

    </div>
  )
}