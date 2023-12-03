import React, { useEffect, useState } from 'react'
import { ContainerPlans } from './style';
import PlanoAssinaturaService from '../../services/PlanoAssinaturaService';

const planoAssinaturaService = new PlanoAssinaturaService();

const Plans = () => {

    const [planos, setPlanos] = useState();
    const [userId, setUserId] = useState();
    const [planoAplicado, setPlanoAplicado] = useState(null);


    const applyPlan = async (payload) => {
        try{
            const res = await planoAssinaturaService.applyPlans(payload);
            console.log(res);
            if (res) {
                console.log('Plano Aplicado');
                setPlanoAplicado(true);
            }
        }catch(e){
            console.error(e);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUserId(user._id);
        const getAllPlans = async () => {
            try{
                const res = await planoAssinaturaService.getPlans();
                console.log(res);
                if (res) setPlanos(res);
            }catch(e){
                console.error(e);
            }
        }
        getAllPlans();
    }, []);
  return (
    <>
        {planos && <ContainerPlans>
            {planos.map((plano, index) => (
            <div key={index} className="box">
              <h2>{plano.nomeDoPlano}</h2>
              <p>{plano.descricao}</p>
              <div>
                <span>
                  <strong>Preço:</strong> R${plano.preco}
                </span>
                <button
                className={`btn-primary ${planoAplicado ? 'applied' : ''}`}
                onClick={() => applyPlan({ userId: userId, planoId: plano._id })}
                disabled={planoAplicado}
                >
                {planoAplicado ? 'Plano Aplicado' : 'Assinar Plano'}
                </button>
              </div>
            </div>
          ))}
        </ContainerPlans>}
    </>
  )
}

export default Plans;