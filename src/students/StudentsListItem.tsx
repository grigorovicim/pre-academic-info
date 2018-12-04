import * as React from "react";

const StudentsListItem = (props: any) => {

    const name = props.student.id; /// TODO IMPORTANT! Show the name (but first, get the name of the student)

        return(
            <tr>
                <td >{name}</td>
            </tr>
        );
}

export default StudentsListItem;
