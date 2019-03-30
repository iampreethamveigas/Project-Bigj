import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import withStyles from "@material-ui/core/styles/withStyles";
import Edit from './Edit'
const styles = theme => ({
    margin: { margin: theme.spacing.unit },
});

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null,
            selectedItem: null,
            id: null,
            modal: false,
            list: false,

        }
    }

    // componentWillUnmount() {
    //     alert("unmount List")
    // }
    // componentWillUpdate() {
    //     alert("List will update")
    // }
    // componentDidUpdate() {
    //     alert("List did update")
    // }

    edit({ i, ele }) {

        this.setState({ id: i, selected: ele, modal: !this.state.modal })
    }

    modalclose() {
        this.setState({ modal: !this.state.modal })
    }
    save = (props) => {

        const { selectedItem } = this.state
        this.props.update({ ...props, selectedItem })
    }
    closelist() {
        this.setState({ list: !this.state.list })

    }
    Lists = key => {
        const { data, classes } = this.props
        const { selectedItem } = this.state
        return (
            <Card>
                <Card className={classes.margin} style={{ display: "flex", backgroundColor: "palevioletred", }}>

                    <CardActionArea>
                        <CardContent style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <Typography gutterBottom variant="overline" component="h2" style={{ display: "flex", width: "50%", }}>
                                Schedules For {selectedItem}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ background: "aliceblue" }}>
                        <Button size="small" color="primary" onClick={this.closelist.bind(this)}>
                            Close
                        </Button>
                    </CardActions>
                </Card >
                {data[selectedItem].map((ele, i) => {
                    return (
                        <Card className={classes.margin} style={{ display: "flex", backgroundColor: "palevioletred", }} key={i}>

                            <CardActionArea>
                                <CardContent style={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Typography gutterBottom variant="overline" component="h2" style={{ display: "flex", width: "50%", }}>
                                        <div style={{ padding: 15, display: "flex", width: "100%", justifyContent: "flex-start" }}>{ele.value}</div>
                                        <div style={{ padding: 15, display: "flex", width: "100%", justifyContent: "flex-end" }}>{ele.time}</div>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ background: "aliceblue" }}>
                                <Button size="small" color="primary" onClick={this.edit.bind(this, { i, ele })}>
                                    Edit
              </Button>
                            </CardActions>
                        </Card >
                    )
                })}
            </Card>
        )
    }
    selecteditem = props => {
        this.setState({ list: !this.state.list, selectedItem: props })
    }
    mainrender() {
        const { data, classes, } = this.props
        const keys = []
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                keys.push(key)
            }
        }

        return keys.map((ele, i) => {
            return <Card className={classes.margin} key={i} >
                <CardActionArea>
                    <CardContent style={{ display: "flex", justifyContent: "space-evenly" }}>
                        <Typography gutterBottom variant="overline" component="h1" style={{ display: "flex", }} onClick={this.selecteditem.bind(this, ele)}>
                            {ele}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        })
    }
    render() {

        // const { data,  } = this.props
        // const { Friday, Sunday, Monday, tuesday, Thursday, Wednesday } = data
        const { modal, id, selected, list } = this.state

        return modal ? (<Edit open={modal} close={this.modalclose.bind(this)} data={{ id, selected }} save={this.save.bind(this)} />) : list ? (
            this.Lists()
        )
            :
            this.mainrender()

    }

}
export default withStyles(styles)(List)