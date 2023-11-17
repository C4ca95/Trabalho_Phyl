import React from "react";
import { CardLogin } from "./style";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../../assets/styles/global.css';


const Signin = () => {



  return (
    <CardLogin>
      <div className="bg">
        <div className="boxContent">
          <div className="card">
            <div className="inputBox">
                        <h2>Login</h2>
                        <input type="text" className='input mb-2' placeholder='E-mail'/>
                        <input type="text" className='input' placeholder='Senha'/>
                    </div>
                    <Link className="forgotPassword">Esqueci minha senha</Link>
                    <div className="buttonBox">
                        <button className='btn-primary mb-2'>Login</button>
                        <button className='btn-secondary'>Registrar</button>
                    </div>
            </div>
        </div>
      </div>
    </CardLogin>
  );
};

export default Signin;
