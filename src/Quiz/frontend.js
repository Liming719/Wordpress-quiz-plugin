import React from "react";
import ReactDOM from "react-dom";
import "./css/frontend.scss"

import QuizBlock from "./QuizBlock";

class QuizFrontend{
    constructor(){        
        document.addEventListener("DOMContentLoaded",function(){
            const divsToUpdate = document.querySelectorAll(".paying-attention-update-me");
        
            divsToUpdate.forEach(function(div){
                const data = JSON.parse(div.querySelector("pre").innerHTML);
                ReactDOM.render(<QuizBlock {...data}/>, div);
                div.classList.remove("paying-attention-update-me");
            })
        })    
    }
} 

export default QuizFrontend

