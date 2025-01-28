import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchData,
  setSearchKey,
  setSelectKey,
  fetchUserDetails,
} from "./action";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import debounce from "lodash.debounce";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

export default function Counter() {
  const { userList, searchKey, selectKey, userNames, isLoading } = useSelector(
    (state) => state
  );

  const [page, setPage] = useState(0);
  const [isDataNeedToShow, setIsDataNeedToShow] = useState(true);
  const [filteredValue, setFilteredValue] = useState([]);
  const dispatch = useDispatch();

  const searchUser = (e) => {
    const userInput = e.target.value.replace(/\s+/g, "").toLocaleLowerCase();
    deBounceDispatch(userInput);
  };

  const deBounceDispatch = debounce((input) => {
    dispatch(setSearchKey(input));
    dispatch(setSelectKey(""));
  }, 500);

  const selectUserTopic = (e) => {
    const selectedValue = e.target.value;
    dispatch(setSelectKey(selectedValue));
  };

  const filterBasedOnSearch = () => {
    console.log({ filteredValue });
    let filteredData = filteredValue;
    if (searchKey) {
      filteredData = filteredData.filter(
        ({ userId, title }) =>
          String(userId) === String(searchKey) ||
          title.replace(/\s+/g, "").toLocaleLowerCase().includes(searchKey)
      );
      console.log({ filteredData });
    }
    if (selectKey) {
      filteredData = filteredData.filter(({ id }) => id === selectKey);
    }
    return filteredData;
  };

  const clearSelectKey = () => {
    dispatch(setSelectKey(""));
  };

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchUserDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sliceData = () => {
    console.log({ userList });
  
    const paginatedValue = userList.slice(page, page + 20); 
    setFilteredValue((prev) => [...prev, ...paginatedValue]);
  
    if (paginatedValue.length) {
      setIsDataNeedToShow(true);
    }
  };

  const handleScroll = () => {
    const gridElement = document.getElementById("grid-id");
    if (!gridElement) return;
  
    const { scrollTop, clientHeight, scrollHeight } = gridElement;
    console.log({ scrollTop, clientHeight, scrollHeight });
  
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 20);
    }
  };

  useEffect(() => {
    if (isDataNeedToShow && userList.length) {
      sliceData();
    }
  }, [page, userList]);

  useEffect(() => {
    const gridElement = document.getElementById("grid-id");
    if (gridElement) {
      gridElement.addEventListener("scroll", handleScroll);
    }
  
    return () => {
      if (gridElement) {
        gridElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="main-flex-container">
      <h1>User List</h1>
      <div className="flex-header-container">
        <div className="flex-container">
          {/* validation pending for user id is pending */}
          <TextField
            id="outlined-basic"
            onChange={searchUser}
            variant="outlined"
            fullWidth
            label="Search user ID and Title"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select User Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectKey || ""}
              label="User Name"
              onChange={selectUserTopic}
            >
              {userNames.map((ele) => (
                <MenuItem value={ele.id}>{ele.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button className="button-style" onClick={clearSelectKey}>
            clear user name
          </Button>
        </div>
      </div>
      <div className="grid" id="grid-id">
        {isLoading ? (
          <CircularProgress />
        ) : (
          filterBasedOnSearch().map((ele) => (
            <div key={ele.id} className="grid-item">
              <div>
                <span className="bold">Name :</span> {ele.userId}
              </div>
              <div>
                <span className="bold">Title :</span> {ele.title}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
