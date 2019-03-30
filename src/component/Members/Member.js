import React from 'react'
// import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Modal from '../Modal/Modal'
import AddMember from './AddMember';


const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    textSpan: {
        fontSize: "2em",
        marginLeft: ".5em"
    },
    root: {
        flexGrow: 1,
    },
    paper: {

        width: 600,
        height: 600
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },

})

class Memebers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            address: null,
            chname: null,
            days: ['Monday', 'Teusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            daysContent: false,
            active: false,
            spacing: '8',

        }
    }

    onChange = props => {
        if (props === 'chname') { }
        else if (props === 'name') { }
        else if (props === 'address') { }
    }
    checkState = props => {
        this.setState((prevState) => ({
            active: prevState.active === props ? false : props,

        }))
    }
    handleChange = key => (event, value) => {
        alert("hello")
        this.setState({
            active: !this.state.active,
        });
    };
    addMember = props => {
        this.setState({
            active: !this.state.active,
        });
    };
    modalClose = props => {
        this.setState({
            active: !this.state.active,
        });
    }
    memberlist = e => {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="overline" > ITS EMPTY ADD ONE</Typography>
                <Chip
                    avatar={<Avatar><AddIcon /></Avatar>}
                    label="Click to Add"
                    className={classes.chip}
                    onClick={this.addMember}
                />
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        const { spacing, active } = this.state;
        return active ? <Modal open={active} close={this.modalClose} classes={classes} children={<AddMember />} title="" /> : (
            <Grid container className={classes.root} spacing={24}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={24}>
                        <Grid item>
                            <Paper className={classes.paper}>
                                {this.memberlist()}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.control}>
                        <Grid container>
                            <Grid item>
                                <FormLabel>spacing</FormLabel>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Memebers);
