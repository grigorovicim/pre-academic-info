import * as React from "react";

import './ProfessorsList.css';

const DashboardProfessorItem = (props: any) => {

    const first_name = props.professor.first_name;
    const last_name = props.professor.last_name;

        return(
            <div>
                {first_name} {last_name}
                <button>x</button>
            </div>
        );
}

export default DashboardProfessorItem;
