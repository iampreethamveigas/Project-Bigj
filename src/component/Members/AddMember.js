import React from 'react'
import profilePageStyle from '../../assets/jss/material-kit-react/views/profilePage.jsx'
import classNames from "classnames";
import { withStyles } from '@material-ui/core';
import profile from '../../assets/img/faces/marc1.jpg'
import TextField from '@material-ui/core/TextField';
import Fileuploader from 'react-firebase-file-uploader'
import firebase from 'firebase'
import Button from "../CustomButtons/Button";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Modal from '../Modal/Modal'
import Progrssbar from '../Views/Progressbar'


const styles = theme => ({
    ...profilePageStyle,
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    flex: { display: "flex" },
    icon: {
        width: "17px",
        height: "17px",
        marginRight: "4px"
    },
    dense: {
        marginTop: 16,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    profile1: {
        textAlign: "center",
        "& img": {
            maxWidth: "160px",
            width: "100%",
            margin: "0 auto",
        }
    },
    schedule: {

    }
})

class ProfileAdd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            church: '',
            address: '',
            phone: '',
            avatar: '',
            isUploading: false,
            progress: 0,
            isSaving: false,
            saved: false,
            avatarUrl: '',
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            0: new Array,
            1: new Array,
            2: new Array,
            3: new Array,
            4: new Array,
            5: new Array,
            6: new Array,
            nameError: '',
            churchError: '',
            addressError: '',
            phoneError: '',

        }
    }

    componentDidMount() {
        firebase.auth().signInWithEmailAndPassword('bigjtv@gmail.com', 'genesisexodus').catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    adduser = (userId, imgUrl, address, church, name, phone) => {
        firebase.database.ref('Preacher/').set({
            name: name,
            church: church,
            address: address,
            phone: phone,
            profile_picture: imgUrl
        })
    }


    handleClickOpen = p => {
        alert("sub")
    }
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = (progress) => this.setState({ progress });
    handleUploadError = (error) => {
        this.setState({ isUploading: false });
        console.error(error);
    }
    handleUploadSuccess = (filename) => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase.storage().ref('images').child(filename).getDownloadURL().then((url, e) => {
            console.log(url, e)
            this.setState({ avatarUrl: url })
        });
    };


    phonenumber = (p) => {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (p.value.match(phoneno)) {
            return true;
        }
        else {

            return false;
        }
    }
    changeVal = p => { }




    componentWillUnmount() {

    }
    _add_member = async p => {
        /// check profile image, name, phone, address
        let valid = true
        const error = {}
        const { name, church, address, phone, avatarUrl } = this.state
        if (name.length < 5) {
            valid = false
            error.nameError = 'Name must be atleast 5 character long'
        }
        if (church.length < 5) {
            valid = false
            error.churchError = 'Name must be atleast 5 character long'
        }
        if (address.length < 5) {
            valid = false
            error.addressError = 'Address must be atleast 5 character long'
        }
        if (!this.phonenumber(phone)) {
            valid = false
            error.phoneError = 'Invalid number Format'
        }
        if (!!valid) {
            this.setState({ ...this.state, ...error })
        }

        if (valid) {
            const { uid } = firebase.auth().currentUser
            const { name, church, address, phone, avatarUrl } = this.state
            const userId = String(name + phone)
            firebase.database().ref('/Preachers/' + uid + '/' + userId + '/').set({
                name,
                church,
                address,
                phone,
                avatarUrl
            }).then(res => console.log(res))
        }
    }
    render() {
        const { classes, } = this.props
        const { avatarUrl, isUploading, progress, days, isSaving, saved } = this.state
        console.log(this.state)
        const imagesClasses = classNames(
            classes.imgRaised,
            classes.imgRoundedCircle,
            classes.imgFluid
        )
        return (
            <div>
                {isSaving && <Modal open={isSaving} children={<Progrssbar size={68} load={isSaving} />} />}
                <div className={classes.profile1}>
                    <div style={{ height: 350 }}>

                        {avatarUrl && <img src={avatarUrl} alt='..' className={imagesClasses} />
                        }
                        {
                            !avatarUrl && <img src={profile} alt='..' className={imagesClasses} />
                        }
                        {isUploading && <p>Progress: {progress} </p>}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Fileuploader
                                accept="image/*"
                                name="avatar"
                                storageRef={firebase.storage().ref('images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}

                            />
                        </div>
                    </div>
                </div>
                <div className={classes.name}>
                    <TextField
                        id="outlined-name"
                        label="Full Name"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        margin="normal"
                        variant="outlined"
                        error={this.state.name === ""}
                        helperText={this.state.name === "" ? 'Empty field!' : ' '}
                    />
                    <TextField
                        id="outlined-name"
                        label="Church Name"
                        className={classes.textField}
                        value={this.state.church}
                        onChange={(e) => this.setState({ church: e.target.value })}
                        margin="normal"
                        variant="outlined"
                        error={this.state.church === ""}
                        helperText={this.state.church === "" ? 'Empty field!' : ' '}

                    />
                    <TextField
                        id="outlined-name"
                        label="Church Address"
                        className={classes.textField}
                        value={this.state.address}
                        onChange={(e) => this.setState({ address: e.target.value })}
                        margin="normal"
                        variant="outlined"
                        error={this.state.address === ""}
                        helperText={this.state.address === "" ? 'Empty field!' : ' '}

                    />
                    <TextField
                        id="outlined-name"
                        label="Phone"
                        className={classes.textField}
                        value={this.state.phone}
                        onChange={(e) => this.setState({ phone: e.target.value })}
                        margin="normal"
                        variant="outlined"
                        error={this.state.phone === ""}
                        helperText={this.state.phone === "" ? 'Empty field!' : ' '}

                    />
                    <Button size="lg" block fullWidth={false} color="primary" onClick={this._add_member.bind(this)}>
                        <Typography variant="button" color="textPrimary" style={{ color: '#fff' }} > Add Member</Typography>
                    </Button>
                </div>
                {/* <div className={classes.schedule}>
                    {days.map((day, i) => {
                        return <ExpansionPanel key={i}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{day}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ flexDirection: 'column' }}>
                                <Typography variant="overline" > ITS EMPTY ADD ONE</Typography>
                                <div className={classes.flex}>
                                    <TextField
                                        id="outlined-name"
                                        label="Time"
                                        className={classes.textField}
                                        // value={this.state.MonData[0].time}
                                        onChange={(e) => {

                                            let newval = e.target.value
                                            let oldval = this.state[i]
                                            let n = { ...oldval, time: newval }
                                            this.setState({ [i]: n })

                                        }}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="outlined-name"
                                        label="Value Name"
                                        className={classes.textField}

                                        onChange={(e) => {
                                            let newval = e.target.value
                                            let oldval = this.state[i]
                                            let n = { ...oldval, value: newval }
                                            this.setState({ [i]: n })
                                        }
                                        }
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <IconButton aria-label="Delete" className={classes.margin} style={{ width: 60, height: 60, marginTop: 15 }} onClick={this.Submitted.bind(null, i)}>
                                        <AddIcon />
                                    </IconButton>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    })}

                </div> */}

            </div >

        )
    }
}

export default withStyles(styles)(ProfileAdd)