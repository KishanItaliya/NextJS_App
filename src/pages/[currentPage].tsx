import { GetStaticPaths } from "next";
import { openDB } from "../../api/openDB";
import Microphones, {getStaticProps} from "./Microphones";

export default Microphones;
export {getStaticProps};

export const getStaticPaths: GetStaticPaths = async () => {
    const db = await openDB();
    const { total } = await db.get("SELECT COUNT(*) AS total FROM microphone");
    const numberOfPages = Math.ceil(total / 5.0);

    const paths = Array(numberOfPages - 1).fill('').map((_, index) => {
        return { params: {currentPage: (index + 1).toString()}}
    })

    return {
        fallback: false,
        paths: paths
    }
}

