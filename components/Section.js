import Link from 'next/link'
import { Grid } from '@material-ui/core'
import Image from 'next/image'

export default function Section(props) {
    console.log(props.link)
    return (
        <Grid item>
            <div className="card">
                <div className="cardPhoto">
                    <Image src={typeof (props.picture) === "undefined" ? "https://raw.sivir.pw/public/images/pic04.jpg" : props.picture}
                        alt={`${props.title}的照片`}
                        width="100vw"
                        height="100vw" />
                </div>
                <div className="container">
                    <h4>{props.title}</h4>
                    <h4 style={{fontSize: '1em', color: 'grey'}}>{props.context}</h4>
                    {typeof (props.link) !== "undefined" &&
                        <Link href={props.link}>
                            <a className="customLink">
                                Learn More
                            </a>
                        </Link>
                    }
                </div>
            </div>
        </Grid>
    )
}
