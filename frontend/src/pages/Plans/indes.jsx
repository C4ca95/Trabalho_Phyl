import React, { useEffect, useState } from 'react'
import { ContainerPlans } from './style';
import PlanoAssinaturaService from '../../services/PlanoAssinaturaService';
import CompanyService from '../../services/CompanyService';
import DevService from '../../services/DevService';

const planoAssinaturaService = new PlanoAssinaturaService();
const companyService = new CompanyService();
const devService = new DevService();

const Plans = () => {

    const [planos, setPlanos] = useState();
    const [userId, setUserId] = useState();
    const [planoAplicado, setPlanoAplicado] = useState(null);
    const [refreshEffect, setRefreshEffect] = useState(false);



    const applyPlan = async (payload) => {
        try{
            const res = await planoAssinaturaService.applyPlans(payload);
            console.log(res);
            if (res) {
                console.log('Plano Aplicado');
                setPlanoAplicado(true);
                refreshDataUser();
                setRefreshEffect(true);
            }
        }catch(e){
            console.error(e);
        }
    }

    const verifyPlanUser = (planId) => {
        if (planId === userId.planUserId) return true;
        return false;
    }

    const refreshDataUser = async () => {
        try{    
            if (localStorage.getItem('role') === 'candidato'){
                const res = await devService.getDevById(userId.userId);
                if (res) localStorage.setItem('user', JSON.stringify(res));
            }else {
                const res = await companyService.getCompanyById(userId.userId);
                if (res) localStorage.setItem('user', JSON.stringify(res));
            }
        }catch(e){
            console.error(e);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        setUserId({userId: user._id, planUserId: user.planoAssinatura});
        const getAllPlans = async () => {
            console.log('passou aq')
            try{
                const res = await planoAssinaturaService.getPlans();
                console.log(res);
                if (res) setPlanos(res);
            }catch(e){
                console.error(e);
            }
        }
        getAllPlans();

        // Resetar o estado de refreshEffect para evitar loops infinitos
    if (refreshEffect) {
        setRefreshEffect(false);
      }
    }, [refreshEffect]);
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
                className={`btn-primary ${verifyPlanUser(plano._id) ? 'applied' : ''}`}
                onClick={() => applyPlan({ userId: userId.userId, planoId: plano._id })}
                
                >
                {verifyPlanUser(plano._id) ? 'Plano Aplicado' : 'Assinar Plano'}
                </button>
              </div>
            </div>
          ))}
        </ContainerPlans>}
    </>
  )
}

export default Plans;