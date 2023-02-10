import { useState, useEffect } from "react";
import { InputGroup, FormControl, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ItemsList from "../ItemsList/ItemsList";
import PicksList from "../PicksList/PicksList";
import Avatar from "../Avatar/Avatar";
import "./UserMenu.css";

const UserMenu = () => {
  const jwtToken = localStorage.getItem("token");
  if (!jwtToken) {
    window.location.replace("/");
  }
  sessionStorage.removeItem("cart")
  sessionStorage.removeItem("price")
  sessionStorage.removeItem("totalCount")

  const [data, setData] = useState([]);
  const [saved, setSaved] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/usermenu`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    });
    setData(res.data);
  };
  useEffect(fetchData, []);

  const fetchSaved = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/saveddistributors`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    });
    setSaved(res.data);
  };
  useEffect(fetchSaved, []);

  const dynamicSearch = () => {
    return data.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const favorites = saved.map(e => e._id)

  return (
    <div>
      <div className="header">
        <div className="searchbar">
          <div className="mt-3">
            <InputGroup>
              <FormControl
                as="input"
                type="text"
                placeholder="Search"
                aria-label="Search"
                id="searchtext"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{borderRadius: "20px"}}
              />
              {/* <InputGroup.Text id="searchicon">
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text> */}
              <FontAwesomeIcon icon={faSearch} className="search-icon" style={{ marginLeft: "-30px", color: "#6c757d" }}/>
            </InputGroup>
          </div>
        </div>
        <Avatar />
      </div>
      <div className="content">
        <h4 className="picks-title mt-3">Top Picks for You</h4>
        <PicksList list={data} />
        <div className="news-title mt-3">
          <h4>Newsfeed</h4>
          {/* <Dropdown>
            <Dropdown.Toggle className="toggle" variant="secondary" align="end">
              Sort
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Most Recent</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Most Popular</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
        <ItemsList saved={favorites} list={dynamicSearch()} />
      </div>
    </div>
  );
};

export default UserMenu;
