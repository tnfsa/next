import {TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import moment from "moment"

export default function CustomTimePicker(props){
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="timepicker">
                <TimePicker
                label={props.label ? props.label : "Time Picker"}
                value={
                    props.value
                    ? moment(props.value, "HH:mm")
                    : moment("00:00", "HH:mm")
                }
                ampm={false}
                autoOk={true}
                minutesStep={10}
                onChange={(time) => props.setSelectedTime(time)}
                error={props.errorMessage ? true : false}
                />
                {props.errorMessage && (
                <span className="error">{props.errorMessage}</span>
                )}
            </div>
        </MuiPickersUtilsProvider>
    )
}