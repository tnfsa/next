import Image from 'next/image'
import Link from 'next/link'
import { Grid } from '@material-ui/core'

export default function Section(props) {
    console.log(props.picture)
    return (
        <Grid item>
            <div className="card">
                <div className="cardPhoto">
                    <Image src={typeof (props.picture) === "undefined" ? "https://raw.sivir.pw/public/images/pic04.jpg" : props.picture}
                        alt={`${props.title}的照片`}
                        layout="fill" />
                </div>
                <div className="container">
                    <h4>{props.title}</h4>
                    <h4>{props.context}</h4>
                    {typeof (props.link) !== "undefined" &&
                        <Link href={props.link} >Learn More</Link>
                    }
                </div>
            </div>
        </Grid>
    )
}
