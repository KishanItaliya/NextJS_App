import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";

export default function People({people}: any) {
    return <div>
        {JSON.stringify(people)}
    </div>
}

People.getInitialProps = async (context: NextPageContext) => {
    const json = await myGet('http://localhost:3000/api/people', context);
    return {people: json};
}