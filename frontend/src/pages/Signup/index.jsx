import React from "react";
import { CardLogin } from "../Signin/style";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DevService from "../../services/DevService";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from "react-hook-form";

const devService = new DevService();

const createDevFormSchema = z.object({
  nome: z.string()
    .min(1, 'O nome é obrigatório')
    .max(50),
  email: z.string(),
  telefone: z.string(),
  cpf: z.string()
    .nonempty('O CPF é obrigatório')
    .refine((value) => value.replace(/[^\d]/g, '').length === 11, {
      message: 'O CPF deve ter 11 dígitos.',
    })
    .transform(cpf => {
      return cpf.replace(/[^\d]/g, '');
    }),
  cidade: z.string(),
  estado: z.string(),
  password: z.string().nonempty('A senha é obrigatório'),
  confirmPassword: z.string()
  .nonempty('A Confirmação da senha é obrigatório')
  .refine((value, data) => value !== data?.password, {
    message: 'As senhas não coincidem.',
  }),
  descricao: z.string()
  .nonempty('A descrição é obrigatório'),
  image: z.string()
  
});

const Signup = () => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm({
    resolver: zodResolver(createDevFormSchema)
  });

  const createDev = async (data) => {
    console.log(data);
    try{
      const res = await devService.createDev(data);
      if (res){
       // alert(res.message)
        console.log(res)
      }
    } catch (e){
      //alert(e.message)
      console.log(e);
    }
  }

  return (
    <CardLogin>
      <div className="bg">
        <div className="boxContent">
          <form className="card" onSubmit={handleSubmit(createDev)}>
            <div className="inputBox">
              <h2>Registrar Candidato</h2>
              <label className="img" htmlFor='profile-img'>
                <input type="file" id="profile-img"/>
              </label>
              <input type="text" className="input mb-2" placeholder="Nome" {...register("nome")}/>
              {errors.nome && <span className="error-message">{errors.nome.message}</span>}
              <input type="text" className="input mb-2" placeholder="E-mail" {...register("email")}/>
              {errors.email && <span className="error-message">{errors.email.message}</span>}
              <input type="text" className="input mb-2" placeholder="Telefone"{...register("telefone")} />
              {errors.telefone && <span className="error-message">{errors.telefone.message}</span>}
              <input type="text" className="input mb-2" placeholder="CPF" {...register("cpf")}/>
              {errors.cpf && <span className="error-message">{errors.cpf.message}</span>}
              <input type="text" className="input mb-2" placeholder="Cidade" {...register("cidade")}/>
              {errors.cidade && <span className="error-message">{errors.cidade.message}</span>}
              <input type="text" className="input mb-2" placeholder="Estado" {...register("estado")}/>
              {errors.estado && <span className="error-message">{errors.estado.message}</span>}
              <input type="password" className="input mb-2" placeholder="Senha" {...register("password")}/>
              {errors.password && <span className="error-message">{errors.password.message}</span>}
              <input type="password" className="input mb-2" placeholder="Confirmar Senha" {...register("confirmPassword")}/>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
              <textarea type="text" className="input" placeholder="Descrição" rows={5} {...register("descricao")}/>
              {errors.descricao && <span className="error-message mt-2">{errors.descricao.message}</span>}
            </div>
            <div className="buttonBox">
              <button type="submit" className="btn-primary mb-2">Criar Conta</button>
            </div>
          </form>
        </div>
      </div>
    </CardLogin>
  );
};

export default Signup;
