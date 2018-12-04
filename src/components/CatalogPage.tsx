import {Component} from "react";
import * as React from "react";
import Header from "../commons/header/Header";

class CatalogPage extends Component<any,any>{

    public render (){
        return (
            <div>
                <Header login="none" courses="none" students="none" catalog="inline" myProfile="none"/>
                <h1>"Catalog Page"</h1>
            </div>
        )
    }
}

export default CatalogPage;