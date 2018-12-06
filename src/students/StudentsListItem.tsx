import * as React from "react";

const StudentsListItem = (props: any) => {

    const first_name = props.student.first_name; 
    const last_name = props.student.last_name;

        return(
            <div>
                {first_name} {last_name}
            </div>
        );
}

export default StudentsListItem;
