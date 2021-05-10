import { GetStaticProps } from "next";
import Link from "next/link";
import { Microphone } from "../../api/Microphone";
import { openDB } from "../../api/openDB";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";

export interface MicrophoneProps {
    microphones: Microphone[];
}

export default function Microphones({microphones}: MicrophoneProps) {
    return <Grid container spacing={3}>
        {microphones.map(microphone => (
            <Grid container item xs={12} sm={4} spacing={3}>
            <Link href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
                <a>
                <Card>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt={microphone.brand + " " +microphone.model}
                        height="200"
                        image={microphone.imageUrl}
                        title={microphone.brand + " " +microphone.model}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {microphone.brand + " " +microphone.model}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </a>
            </Link>
            </Grid>
        ))}
    </Grid>
}

export const getStaticProps: GetStaticProps = async context => {
    const currentPage = context.params?.currentPage as string;
    const currentPageNumber = +(currentPage || 0);

    const min = currentPageNumber * 5;
    const max = (currentPageNumber + 1) * 5;

    const db = await openDB();

    const microphones = await db.all("SELECT * FROM microphone where id > ? AND id <= ?", min, max);
    return { props: {microphones}}
}