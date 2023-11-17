import React from "react";
import { CardLogin } from "../Signin/style";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Signup = () => {
  return (
    <CardLogin>
      <div className="bg">
        <div className="boxContent">
          <div className="card">
            <div className="inputBox">
              <h2>Registrar Candidato</h2>
              <label className="img" for='profile-img'>
                <input type="file" id="profile-img"/>
              </label>
              <input type="text" className="input mb-2" placeholder="Nome" />
              <input type="text" className="input mb-2" placeholder="E-mail" />
              <input type="text" className="input mb-2" placeholder="Telefone" />
              <input type="text" className="input mb-2" placeholder="CPF" />
              <input type="text" className="input mb-2" placeholder="Cidade" />
              <input type="text" className="input mb-2" placeholder="Estado" />
              <input type="text" className="input mb-2" placeholder="Senha" />
              <input type="text" className="input mb-2" placeholder="Confirmar Senha" />
              <textarea type="text" className="input" placeholder="Descrição" rows={5} />
              
            </div>
            <div className="buttonBox">
              <button className="btn-primary mb-2">Criar Conta</button>
            </div>
          </div>
        </div>
      </div>
    </CardLogin>
  );
};

export default Signup;
