import React from 'react'
import { ContainerProfile } from './style';

const Profile = () => {
  return (
    <ContainerProfile>
        <div className="image-profile">
            <label htmlFor="picture"></label>
            <input name='picture' id='picture' type="file" />
        </div>
        <form className='data-profile'>
            <h2 className='mb-2'>Dados Pessoais: </h2>
            <input type="text" className='input mb-2' placeholder='Nome'/>
            <input type="text" className='input mb-2' placeholder='E-mail' />
            <input type="text" className='input mb-2' placeholder='Telefone' />
            <input type="text" className='input mb-2' placeholder='CPF' />
            <input type="text" className='input mb-2' placeholder='Cidade' />
            <input type="text" className='input mb-2' placeholder='Estado' />
            <textarea className='input' placeholder='Descrição' name="desc" id="desc" cols="30" rows="4"></textarea>
            <div className="btn-area">
                <button className='btn-primary'>Salvar</button>
                <button className='btn-secondary'>Cancelar</button>
            </div>
        </form>
    </ContainerProfile>
  );
}

export default Profile;