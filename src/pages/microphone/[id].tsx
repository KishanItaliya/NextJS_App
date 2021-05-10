import { GetStaticPaths, GetStaticProps } from "next";
import { Microphone } from "../../../api/Microphone";
import { openDB } from "../../../api/openDB";
import { useRouter } from "next/router";


export type MicrophoneDetailProps = Microphone;

export default function MicrophoneDetail({id, brand, model, price, imageUrl}: MicrophoneDetailProps) {
    const router = useRouter();

    if(router.isFallback){
        return <div>Loading......</div>
    }

    return <div>
        <div>{id}</div>
        <div>{brand}</div>
        <div>{model}</div>
        <div>{price}</div>
        <div>{imageUrl}</div>
    </div>
}

export const getStaticProps: GetStaticProps = async context => {
    const id = context.params?.id as string;
    const db = await openDB();
    const microphone = await db.get("SELECT * FROM microphone WHERE id = ?", +id);
    return { props: microphone}
}

export const getStaticPaths: GetStaticPaths<{id: string}> = async () => {
    const db = await openDB();
    const microphones = await db.all("SELECT * FROM microphone");
    const paths = microphones.map(a => {
        return { params: { id: a.id.toString()}} 
    });
    return {
        fallback: true,
        paths
    };
}