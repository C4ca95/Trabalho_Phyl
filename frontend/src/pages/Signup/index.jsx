import React, { useRef, useState } from "react";
import { CardLogin } from "../Signin/style";
import DevService from "../../services/DevService";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { Toast } from 'primereact/toast';
import InputMask from 'react-input-mask';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const devService = new DevService();

const createDevFormSchema = z.object({
  nome: z.string()
    .min(1, 'O nome é obrigatório')
    .max(50),
  email: z.string().nonempty('O E-mail é obrigatório'),
  telefone: z.string().nonempty('O telefone é obrigatório'),
  cpf: z.string()
    .nonempty('O CPF é obrigatório')
    .refine((value) => value.replace(/[^\d]/g, '').length === 11, {
      message: 'O CPF deve ter 11 dígitos.',
    })
    .transform(cpf => {
      return cpf.replace(/[^\d]/g, '');
    }),
  cidade: z.string().nonempty('A cidade é obrigatório'),
  estado: z.string().nonempty('O estado é obrigatório'),
  senha: z.string().nonempty('A senha é obrigatório'),
  confirmarSenha: z.string(),
  descricao: z.string()
  .nonempty('A descrição é obrigatório'),
  image: z.optional(z.string())

}).refine((data) => data.confirmarSenha === data?.senha, {
  message: 'As senhas não coincidem.',
  path: ['confirmarSenha']
})

const Signup = () => {

  const toast = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { register, handleSubmit, setValue, formState: {errors} } = useForm({
    resolver: zodResolver(createDevFormSchema)
  });

  const history = useHistory();

  const createDev = async (data) => {
    console.log(data);
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    if(selectedImage) formData.append('image', selectedImage);
    try{
      const res = await devService.createDev(formData);
      if (res){
       // alert(res.message)
        console.log(res)
        toast.current.show({severity:'success', summary: 'Success', detail:'Candidato criado com sucesso!', life: 3000});
        history.push('/signin');
      }
    } catch (e){
      //alert(e.message)
      toast.current.show({severity:'error', summary: 'Error', detail: 'Erro ao criar o candidato' , life: 3000});

      console.log(e);
    }
  }


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <CardLogin>
      <Toast ref={toast} />
      <div className="bg">
        <div className="boxContent">
          <form className="card" onSubmit={handleSubmit(createDev)}>
            <div className="inputBox">
              <h2>Registrar Candidato</h2>
              <label className="img" htmlFor='profile-img' style={selectedImage ? {backgroundImage: `url(${URL.createObjectURL(selectedImage)})`} : null}>
                <input onChange={handleImageChange} accept="image/*" type="file" id="profile-img"/>
              </label>
              <input type="text" className="input mb-2" placeholder="Nome" {...register("nome")}/>
              {errors.nome && <span className="error-message">{errors.nome.message}</span>}
              <input type="text" className="input mb-2" placeholder="E-mail" {...register("email")}/>
              {errors.email && <span className="error-message">{errors.email.message}</span>}
              <InputMask mask="(99) 9 9999-9999" className="input mb-2" placeholder="Telefone" {...register("telefone")} />
              {errors.telefone && <span className="error-message">{errors.telefone.message}</span>}
              <InputMask mask="999.999.999-99" className="input mb-2" placeholder="CPF" {...register("cpf")}/>
              {errors.cpf && <span className="error-message">{errors.cpf.message}</span>}
              <input type="text" className="input mb-2" placeholder="Cidade" {...register("cidade")}/>
              {errors.cidade && <span className="error-message">{errors.cidade.message}</span>}
              <input type="text" className="input mb-2" placeholder="Estado" {...register("estado")}/>
              {errors.estado && <span className="error-message">{errors.estado.message}</span>}
              <input type="password" className="input mb-2" placeholder="Senha" {...register("senha")}/>
              {errors.senha && <span className="error-message">{errors.senha.message}</span>}
              <input type="password" className="input mb-2" placeholder="Confirmar Senha" {...register("confirmarSenha")}/>
              {errors.confirmarSenha && <span className="error-message">{errors.confirmarSenha.message}</span>}
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
