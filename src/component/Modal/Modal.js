import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Person from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';



const styles = {
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
};

class ResponsiveDialog extends React.Component {
    state = {
        open: false,
        day: '',
        name: 'hai',
        labelWidth: 0,
    };

    handleClickOpen = () => {
        const { open } = this.props;

        this.setState({ open });
    };
    componentDidMount() {
        const { open } = this.props;
        this.setState({ open });
    }
    componentWillUnmount() {
        this.setState({ open: false });
    }
    handleClose = () => {

    };
    handleChange = p => {
        // this.setState({ day: p.target })
    }
    addMember = props => {
        const { classes } = this.props
        return (
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={16}>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Avatar alt="Remy Sharp" className={classes.bigAvatar} ></Avatar><Person />
                                    <Button variant="contained" color="default" className={classes.button}>
                                        Upload
                                        <CloudUploadIcon className={classes.rightIcon} />
                                    </Button>
                                </div>
                                <div>
                                    <form className={classes.container} noValidate autoComplete="off">
                                        <TextField
                                            id="outlined-name"
                                            label="First Name"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            variant="outlined"
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Last Name"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <TextField
                                            id="outlined-name"
                                            label="Church Name"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            variant="outlined"
                                        />

                                        <TextField
                                            id="outlined-name"
                                            label="Church Address"
                                            className={classes.textField}
                                            value={this.state.name}
                                            onChange={this.handleChange('name')}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </form>
                                </div>
                               
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    render() {
        const { fullScreen, open, title, classes, children } = this.props;
        // console.log(this.state,this.props)
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        {children}
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={this.props.close} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ResponsiveDialog);