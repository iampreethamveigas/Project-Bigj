import React from 'react'
// import Card from '@material-ui/core/Card';
import firebase from 'firebase'
import List from '../Views/List'
class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            loading: true,
            error: false,
            updateError: false
        }
    }

    componentDidMount() {
        this.fetchdata()
    }
    // componentWillUnmount(){
    //     alert("unmount sche")
    // }
    // componentWillUpdate(){
    //     alert("sch will update")
    // }
    // componentDidUpdate(){
    //     alert("sch did update")
    // }

    fetchdata() {
        firebase.database().ref('s').once('value').then(function (snapshot) {
            this.setState({ data: snapshot.val() })
        }.bind(this)).catch((e) => this.setState({ error: true }))
    }
    update(el) {
        console.log(el)
        firebase.database().ref('s').child(`${el.selectedItem}/${el.id}`).update({ time: el.time, value: el.value },
            error => { if (error) { console.log(error) } else { console.log("updated") } }
        )

    }
    render() {
        const { data, error } = this.state

        return error === false && data !== null ? (<List data={data} error={error} update={(el) => this.update(el)} />) : (null)
    }

}
export default Schedule