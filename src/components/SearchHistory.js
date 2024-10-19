import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

function SearchHistory({ searchHistory, searchHistoryWeather, deleteHistory }) {
  return (
    <div className="search-history">
      <h2>Search History</h2>
      <List>
        {searchHistory.map((entry, index) => (
          <ListItem
            className="item"
            secondaryAction={
              <div style={{ display: "flex" }}>
                <ListItemAvatar
                  style={{ minWidth: "53px" }}
                  onClick={() =>
                    searchHistoryWeather(entry.city, entry.country)
                  }
                >
                  <Avatar
                    style={{
                      background: "transparent",
                      border: "3px solid gray",
                    }}
                  >
                    <SearchIcon style={{ color: "grey" }} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemAvatar
                  style={{ minWidth: 0 }}
                  onClick={() => deleteHistory(index)}
                >
                  <Avatar
                    style={{
                      background: "transparent",
                      border: "3px solid gray",
                    }}
                  >
                    <DeleteIcon style={{ color: "grey" }} />
                  </Avatar>
                </ListItemAvatar>
              </div>
            }
          >
            <ListItemText
              style={{ marginLeft: "10px" }}
              primary={
                <span>
                  {entry.city}, {entry.country}
                </span>
              }
              secondary={<span style={{ color: "gray" }}>{entry.date}</span>}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default SearchHistory;
