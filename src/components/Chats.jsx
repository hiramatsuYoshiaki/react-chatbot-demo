import React from "react";
import { Chat } from "./index";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
const useStyles = makeStyles(() =>
  createStyles({
    chats: {
      height: 400,
      padding: "0",
      overflow: "auto",
    },
  })
);
const Chats = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.chats} id={"scroll-area"}>
      {props.chats.map((value, index) => {
        return (
          <Chat text={value.text} type={value.type} key={index.toString()} />
        );
      })}
    </List>
  );
};

export default Chats;
