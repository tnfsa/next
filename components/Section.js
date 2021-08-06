import Link from 'next/link'
import { Grid } from '@material-ui/core'
import Image from 'next/image'

export default function Section(props) {
    return (
        <Grid item>
            <div className="">
                <div className="cardPhoto">
                    <Image src={typeof (props.picture) === "undefined" ? "https://raw.sivir.pw/public/images/pic04.jpg" : props.picture}
                        alt={`${props.title}的照片`}
                        layout="responsive"
                        width="100"
                        height="60" />
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
