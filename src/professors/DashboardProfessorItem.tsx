import * as React from "react";

const DashboardProfessorItem = (props: any) => {

    const name = props.professor.nickname;

        return(
            <tr>
                <td >{name}</td>
            </tr>
        );
}

export default DashboardProfessorItem;
