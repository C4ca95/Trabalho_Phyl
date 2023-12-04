import React from 'react'
import { ContainerListJobs } from './style'
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Monitor from '@material-ui/icons/DesktopMac';


const ListJobs = () => {
  return (
    <ContainerListJobs>

        <div className='container'>
                <h2 className='title'>Titulo da vaga</h2>
            <div className='mainbox'>
                <div className="box">
                    <figure className=''>
                        <HomeIcon className='' color='primary'></HomeIcon>
                        <span>Sede: São Paulo, Ipiranga</span>
                    </figure>
                    <span>Remoto</span>
                </div>

                <div className="box">
                <figure className=''>
                    <Monitor color='primary'></Monitor>
                    <span>Desenvolvedor Front-end</span>
                </figure>
                <span>Contrato: CLT</span>
                </div>

                <div className="box">
                    <figure>
                        <MoneyIcon color='primary'></MoneyIcon>
                        <span>Salário: <strong>R$1800,00</strong></span>
                    </figure>
                </div>

                <span>Descrição da vaga: </span>
                <textarea className='input' name="descricaovaga" id="area" cols="20" rows="5"></textarea>
            </div>
        </div>
            

    </ContainerListJobs>
  )
}

export default ListJobs;