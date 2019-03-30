/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownloa0, FavoriteBorder } from "@material-ui/icons";
import { Link } from "react-router-dom";

// core components
import Button from "../CustomButtons/Button"

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Home Page"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <Link to="/" style={{ color: '#fff' }}>Home</Link>
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="See Schedules"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <Link to="/Schedule/" style={{ color: '#fff' }}>Schedule</Link>

            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Add Members"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            <Link to="/Member/" style={{ color: '#fff' }}>Member</Link>

            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>

    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
