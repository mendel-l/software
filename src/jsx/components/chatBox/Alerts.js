import React from "react";
import {Link} from 'react-router-dom';
const Alertas = ({ toggleTab, PerfectScrollbar, toggleChatBox }) => {
   return (
      <div
         className={`tab-pane fade  ${
            toggleTab === "alertas" ? "active show" : "active show"
         }`}
         id="alertas"
         role="tabpanel"
      >
         <div className="card mb-sm-3 mb-md-0 contacts_card">

            <div
               className={`card-body contacts_body p-0 dlab-scroll  ${
                  toggleChatBox ? "ps ps--active-y" : ""
               }`}
               id="DZ_W_Contacts_Body1"
            >
               <ul className="contacts">
                  <li className="name-first-letter">Medicamentos vencidos</li>
                  <li className="active">
                     <div className="d-flex bd-highlight">
                      
                        <div className="user_info">
                           <span>Medicamentoprueba</span>
                        </div>
                     </div>
                  </li>
               </ul>
            </div>
            <div className="card-footer"></div>
         </div>
      </div>
   );
};

export default Alertas;
