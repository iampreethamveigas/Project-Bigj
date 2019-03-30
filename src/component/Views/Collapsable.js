import React from 'react'
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import UnfoldLess from '@material-ui/icons/UnfoldLess';
import DeleteIcon from '@material-ui/icons/Delete';

import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';

const data = {
    det: [{ time: "5.00 AM", Name: "Dinada Manna" },
    { time: "6.00 AM", Name: "Dinada Manna" },
    { time: "7.00 AM", Name: "Dinada Manna" },
    { time: "8.00 AM", Name: "Dinada Manna" }
    ]
}

class CollapsableComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false, height: 0,
            time: '',
            detail: '',
            multiline: 'Controlled',
        }
    }
    clicked = props => {
        this.setState({ active: !this.state.active, height: 400 })
    }
    list = props => {
        return data.det.map((el, i) => {
            return (<div><Card style={{display:'flex'}}>
                <CardActionArea>
                    <CardContent>{"Time :-" + el.time + ' - Name:- ' + el.Name}  </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={this.delete.bind(null, i, el)}>
                        <DeleteIcon />
                    </Button>
                </CardActions>
            </Card></div>)
        })

    }
    delete = p => { }
    handleChange = (val, e) => {
        if (val === 'Time') {
            this.setState({ time: e.target.value })
        }
        else if (val === 'Name') {
            this.setState({ detail: e.target.value })
        }

    }
    addTD = props => {
        const { time, detail } = this.state
    }
    render() {
        const { active, height } = this.state
        const { title, data, classes } = this.props

        return (<Card>
            <div style={{ float: 'left', margin: 15, display: 'flex' }} className={classes.margin}>
                <Fab size="small" color="secondary" aria-label="Add" onClick={this.clicked}>
                    {active ? <UnfoldLess /> : <AddIcon />}
                </Fab>
                <span className={classes.textSpan}>{title}</span>
            </div>
            <Card style={{ display: active ? "flex" : "none", width: '100%' }}>
                <div >
                    <div> {this.list()}</div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="outlined-name"
                            label="Time"
                            className={classes.textField}
                            value={this.state.time}
                            onChange={this.handleChange.bind(null, 'Time')}
                            margin="normal"
                            variant="outlined"
                        />

                        <TextField
                            id="outlined-name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.detail}
                            onChange={this.handleChange.bind(null, 'Name')}
                            margin="normal"
                            variant="outlined"
                        />

                    </form>
                    <Card style={{ width: '100%' }}> <Button onClick={this.addTD}> <AddIcon /></Button> </Card>
                </div>


            </Card>
        </Card>)
    }
}
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    textSpan: {
        fontSize: "2em",
        marginLeft: ".5em"
    },
    margin: {
        margin: 5,
    },
});

export default withStyles(styles)(CollapsableComponent)