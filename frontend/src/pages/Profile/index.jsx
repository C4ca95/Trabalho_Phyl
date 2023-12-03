import React, { useState, useEffect } from "react";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import DevService from '../../services/DevService';
import CompanyService from '../../services/CompanyService';
import { compareObjects } from '../../utils/CompareObjects';
import { ContainerProfile } from "./style";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Dialog } from 'primereact/dialog';
import VagaService from "../../services/VagaService";
import { Link, NavLink } from "react-router-dom/cjs/react-router-dom";

const vagaService = new VagaService();

const vacancieScehma = z.object({
  titulo: z.string()
    .min(1, 'O titulo é obrigatório')
    .max(50),
  localizacao: z.string().nonempty('A localização é obrigatório'),
  modalidade: z.string().nonempty('A modalidade é obrigatório'),
  salario: z.string().nonempty('O salário é obrigatório'),
  setor: z.string().nonempty('O setor é obrigatório'),
  nivelExperiencia: z.string().nonempty('O nível de experiência é obrigatório'),
  tipoContrato: z.string().nonempty('O tipo de contrato é obrigatório'),
  descricao: z.string()
  .nonempty('A descrição é obrigatório'),
});


const ModalCreateJobs = ({visible, setVisible, user}) => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm({
    resolver: zodResolver(vacancieScehma)
  });
  const toast = useRef(null);

  const createVacancie = async (data) => {
    data.idEmpresa = user._id;
    try{
      const res = await vagaService.createVacancie(data);
      if (res) {
        console.log(res);
        setVisible(false);
        toast.current.show({severity:'success', summary: 'Success', detail:'Vaga criada com sucesso!', life: 3000});
      }
    }catch(e){
      console.error(e)
      toast.current.show({severity:'error', summary: 'Error', detail: 'Erro ao criar o vaga' , life: 3000});

    }
  }

  return (
    <>
      <Toast ref={toast} />
      <button className="btn-primary mb-2" onClick={() => setVisible(true)}>Criar vaga</button>
      <Dialog header="Criação de vagas" visible={visible} style={{ width: '90vw' }} onHide={() => setVisible(false)}>
        <form onSubmit={handleSubmit(createVacancie)}>
          <input type="text" className='input mb-2' placeholder='Título da vaga' {...register('titulo')}/>
          {errors.titulo && <span className="error-message">{errors.titulo.message}</span>}
          <input type="text" className='input mb-2' placeholder='Localização da vaga' {...register('localizacao')}/>
          {errors.localizacao && <span className="error-message">{errors.localizacao.message}</span>}
          <select className='input mb-2'  placeholder='Modalidade' {...register('modalidade')}>
            <option value="" disabled selected>Modalidade</option>
            <option value="Presencial">Presencial</option>
            <option value="Hibrido">Hibrído</option>
            <option value="Remoto">Remoto</option>
          </select>
          {errors.modalidade && <span className="error-message">{errors.modalidade.message}</span>}
          <input type="number" className='input mb-2'  placeholder='Salário' {...register('salario')}/>
          {errors.salario && <span className="error-message">{errors.salario.message}</span>}
          <input type="text" className='input mb-2'  placeholder='Setor de atuação' {...register('setor')}/>
          {errors.setor && <span className="error-message">{errors.setor.message}</span>}
          <select className='input mb-2' {...register('nivelExperiencia')}>
            <option value="" disabled selected>Nível de Experiência</option>
            <option value="Estagio">Estágio</option>
            <option value="Trainee">Trainee</option>
            <option value="Junior">Júnior</option>
            <option value="Pleno">Pleno</option>
            <option value="Senior">Sênior</option>
          </select>
          {errors.nivelExperiencia && <span className="error-message">{errors.nivelExperiencia.message}</span>}
          <select className='input mb-2' {...register('tipoContrato')}>
            <option value="" disabled selected>Contrato</option>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="temporario">Temporário</option>
          </select>
          {errors.tipoContrato && <span className="error-message">{errors.tipoContrato.message}</span>}
          <textarea className='input' placeholder='Descrição' name="desc" id="desc" cols="30" rows="4" {...register('descricao')}></textarea>
          {errors.descricao && <span className="error-message">{errors.descricao.message}</span>}
          <div className="footer">
            <button type="submit" className="btn-save mr-2">Salvar</button>
            <button type="reset" className="btn-delete" onClick={() => setVisible(false)} autoFocus> Cancelar</button>
          </div>
        </form>
      </Dialog>
    </>
  )
}

const userSchema = z.object({
  nome: z.string(),
  telefone: z.string(),
  cidade: z.string(),
  estado: z.string(),
  descricao: z.string()

});

const devService = new DevService();
const companyService = new CompanyService();

const Profile = () => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm({
    resolver: zodResolver(userSchema)
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const updateUser = async (data) => {
    const role = localStorage.getItem('role');
    const newData = compareObjects(data, user);
    //console.log(newData);
    if (role === 'empresa'){
      try{
        const res = await companyService.updateCompany(user._id, newData);
        if (res) {
          //console.log(res);
          localStorage.setItem('user', JSON.stringify(res));
          setUser(res);
          toast.current.show({severity:'success', summary: 'Success', detail:'Empresa atualizada com sucesso!', life: 3000});
        }
      }catch(e){
        console.log(e)
      }
    } else if (role === 'candidato'){
      try{
        const res = await devService.updateDev(user._id, newData);
        if (res) {
          //console.log(res);
          localStorage.setItem('user', JSON.stringify(res));
          setUser(res);
          toast.current.show({severity:'success', summary: 'Success', detail:'Candidato atualizado com sucesso!', life: 3000});
        }
      }catch(e){
        console.log(e)
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(JSON.parse(user));
  }, []);

  return (
    <ContainerProfile>
      <Toast ref={toast} />
        <div className="image-profile" style={selectedImage ? {backgroundImage: `url(${URL.createObjectURL(selectedImage)})`} : null}>
            <label htmlFor="picture"></label>
            <input onChange={handleImageChange} name='picture' id='picture' type="file" />
        </div>
        <form className='data-profile' onSubmit={handleSubmit(updateUser)}>
            <h2 className='mb-2'>Dados Pessoais: </h2>
            <input type="text" className='input mb-2' defaultValue={user?.nome} placeholder='Nome' {...register('nome')}/>
            <input type="text" className='input mb-2' defaultValue={user?.email} placeholder='E-mail' disabled/>
            <input type="text" className='input mb-2' defaultValue={user?.telefone} placeholder='Telefone' {...register('telefone')}/>
            {/* <input type="text" className='input mb-2' placeholder='CPF' /> */}
            <input type="text" className='input mb-2' defaultValue={user?.cidade} placeholder='Cidade' {...register('cidade')}/>
            <input type="text" className='input mb-2' defaultValue={user?.estado} placeholder='Estado' {...register('estado')}/>
            <textarea className='input' placeholder='Descrição' defaultValue={user?.descricao} name="desc" id="desc" cols="30" rows="4" {...register('descricao')}></textarea>
            <div className="btn-area">
                <button type='submit' className='btn-primary'>Salvar</button>
                <button type='reset' className='btn-secondary'>Cancelar</button>
            </div>
        </form>
       {localStorage.getItem('role') === 'empresa' && <div className="jobs-vacancies">
          <h2 className="mb-2">Vagas:</h2>
          <div className="btn-box">
            <ModalCreateJobs visible={visible} setVisible={setVisible} user={user}/>
            <NavLink to={'/list-jobs'} className="btn-primary">Visualizar vagas ativas</NavLink>
          </div>
        </div>}
        <div className="delete">
          <Link to={'/plans'} className="btn-primary mb-2 planos">Verificar Planos de Assinatura</Link>
          <button className="btn-delete">Deletar Conta</button>
        </div>

    </ContainerProfile>
  );
}

export default Profile;