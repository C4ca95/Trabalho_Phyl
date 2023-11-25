import React from "react";
import { CardLogin } from "./style";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import '../../assets/styles/global.css';
import AuthService from "../../services/AuthService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from 'react-router-dom';


const authService = new AuthService();

const loginSchema = z.object({
  email: z.string().nonempty("O email é obrigatório"),
  senha: z.string().nonempty("A senha é obrigatório"),
})

const Signin = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const history = useHistory();

  const login = async (data) => {
    try{
      const res = await authService.login(data);
      if (res) {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.user))
        localStorage.setItem('role', res.role)
        history.push('/');
      }
    }catch(e){
      console.log(e.message)
    }
  }

  return (
    <CardLogin>

      <div className="bg">
        <div className="boxContent">
          <form className="card" onSubmit={handleSubmit(login)}>
            <div className="inputBox">
              <h2>Login</h2>
              <input type="text" className='input mb-2' placeholder='E-mail' {...register('email')}/>
              {errors.email && <span className="error-message">{errors.email.message}</span>}
              <input type="text" className='input' placeholder='Senha' {...register('senha')}/>
              {errors.senha && <span className="error-message">{errors.senha.message}</span>}
              </div>
              <Link className="forgotPassword">Esqueci minha senha</Link>
              <div className="buttonBox">
                  <button className='btn-primary mb-2'>Login</button>
                  <Link to={'/select-register'} className='btn-secondary'>Registrar</Link>
              </div>
          </form>
        </div>
      </div>
    </CardLogin>
  );
};

export default Signin;
