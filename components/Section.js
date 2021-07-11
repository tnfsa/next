import {Card,Button} from 'react-bootstrap'

export default function Section(props) {
    return (
        <Card style={{'width':'18rem'}}>
            <Card.Img src={typeof (props.picture) === "undefined" ? "https://raw.sivir.pw/public/images/pic04.jpg" : props.picture}
                      alt={"alt"}/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.context}</Card.Text>
                <Button href={props.link} style={{'text-decoration': 'none'}}>Learn More</Button>
            </Card.Body>
        </Card>
    )
}
