import React from "react";
import { Name } from "../../utils/utilities";
import { Line, Title } from "./style";


const TopLine: React.FC<Name> = (props) => {


    return (
        <Line>

            <Title>{props.name}</Title>

        </Line>
    );
}
export default TopLine;