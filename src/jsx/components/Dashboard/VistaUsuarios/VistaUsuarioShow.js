// VistaUsuarioShow.js
import React from 'react';
import './vistaUser.css'; // Importa el archivo CSS

const VistaUsuarioShow = () => {
  return (
    <div>
      <section className="welcome-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="welcome-content">
                <h2>Bienvenido a Nuestra Página</h2>
                <p>
                  Gracias por visitarnos. Somos una empresa dedicada a... (breve descripción).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-content">
                <h2>¿Quiénes Somos?</h2>
                <p>
                  Somos un equipo apasionado que se dedica a... (más información sobre tu empresa).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact-content">
                <h2>Contacto</h2>
                <p>
                  Estamos aquí para ayudarte. Puedes comunicarte con nosotros a través de...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VistaUsuarioShow;

