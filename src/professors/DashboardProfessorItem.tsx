import * as React from "react";

import './ProfessorsList.css';

const DashboardProfessorItem = (props: any) => {

    const name = props.professor.nickname;

        return(
            <div>
                
                <tr>
                    <td className="p-professors-basic-item">{name}</td>
                    <button>x</button>
                </tr>
            </div>
        );
}

export default DashboardProfessorItem;
