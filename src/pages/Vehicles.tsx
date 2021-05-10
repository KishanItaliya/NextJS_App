import { NextPageContext } from "next";
import { myGet } from "../../api/myGet";

export default function Vehicles({vehicles}: any) {
    return <div>
        {JSON.stringify(vehicles)}
    </div>
}

Vehicles.getInitialProps = async (context: NextPageContext) => {
    const json = await myGet('http://localhost:3000/api/vehicles', context);
    return {vehicles: json};
}