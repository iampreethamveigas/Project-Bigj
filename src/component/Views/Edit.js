import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}



class FullScreenDialog extends React.Component {
    state = {
        open: false,
        selectedDate: new Date(),
        id: null,
        time: null,
        value: null,
    };

    // componentWillUnmount(){
    //     alert("unmount FullScreenDialog")
    // }
    // componentWillUpdate(){
    //     alert("FullScreenDialog will update")
    // }
    // componentDidUpdate(){
    //     alert("FullScreenDialog did update")
    // }
    componentDidMount() {
        const { open, data } = this.props
        // console.log(String(data.selected.time))
        // // const time = ltime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        // let d = String(data.selected.time)
        // let h = Number(d.match(/^(\d+)/)[1])
        // let m = Number(d.match(/(\.|\:)(\d+)/)[2])
        // console.log(h, m)

        // let AMPM = d.match(/\s(.*)$/)[1]
        // if (AMPM == "Pm" && h < 12) h = h + 12;
        // if (AMPM == "Am" && h == 12) h = h - 12;
        // let sHours = h.toString();
        // let sMinutes = m.toString();
        // if (h < 10) sHours = "0" + sHours;
        // if (m < 10) sMinutes = "0" + sMinutes;
        // const sec = "00"
        // console.log(sHours, sMinutes)
        // const ttt = new Date('2018-03-05T' + sHours + ':' + sMinutes + ':' + sec + 'Z').toUTCString()
        // console.log(ttt)
        this.setState({ open, id: data.id, time: data.selected.time, value: data.selected.value })
    }
    save = () => {
        const { time, value, id } = this.state
        this.props.save({ time, value, id })
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, time: '', value: '' });
        this.props.close()
    };
    handleDateChange = (time) => {
        console.log(time)
        this.setState({ time, selectedDate: time.getTime() })
    }
    textChange = text => {
        const val = text.target.value;
        this.setState({ value: val })
    }
    timeChange = text => {
        const val = text.target.value;
        this.setState({ time: val })
    }
    render() {
        const { classes } = this.props;
        const { value, time } = this.state

        return (
            <div>

                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                Cancel
              </Typography>
                            <Button color="inherit" onClick={this.save}>
                                save
              </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                            <TextField
                                id="filled-full-width"
                                style={{ margin: 8 }}
                                placeholder="Name"
                                fullWidth
                                margin="normal"
                                variant="filled"
                                value={time}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.timeChange}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <TextField
                                id="filled-full-width"
                                style={{ margin: 8 }}
                                placeholder="Name"
                                fullWidth
                                margin="normal"
                                variant="filled"
                                value={value}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.textChange}
                            />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);