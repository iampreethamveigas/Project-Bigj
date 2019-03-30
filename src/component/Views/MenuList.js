import React from 'react'
import Schdule from '../Schedule/Schedule'
import Member from '../Members/Member'
import { Input } from '@material-ui/icons';
import Schedule from '../Schedule/Schedule';
const openSchedule = () => alert("cl")
const openMember = () => <Member />

export default function MenuList() {
    return (
        <div><Input onClick={openSchedule()} values={"Schdule"} />
            <Input onClick={openMember()} values={"Schdule"} />
        </div>
    )
}