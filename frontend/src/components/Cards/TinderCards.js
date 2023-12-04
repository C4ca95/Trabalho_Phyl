import React, {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card';

import database from '../../Firebase/Firebase';
import { Container, Div, CardContainer } from './styles';
import DevService from '../../services/DevService';
import CompanyService from '../../services/CompanyService';
import SwipeButtons from '../Buttons/SwipeButtons';

const devService = new DevService();
const empService = new CompanyService();

function TinderCards() {
  const [otherUSers, setOtherUsers] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const userJson = JSON.parse(user);
    setUser(userJson);

   if (localStorage.getItem('role') === 'empresa'){
    const getCandidatos = async () => {
      try {
        const res = await empService.getDevsMatch(userJson._id);
        if (res){
          console.log(res);
          setOtherUsers(res);
        }
      }catch(e){
        console.error(e);
      }
    }
    getCandidatos();

   } else {
    const getEmpresas = async () => {
      try {
        const res = await devService.getEmpMatch(userJson._id);
        if (res){
          console.log(res);
          setOtherUsers(res);
        }
      }catch(e){
        console.error(e);
      }
    }
    getEmpresas();
   }

  }, [])
 // const people = [];
  //people.push = [];

  //setPeople([...people, 'sonny', 'quazi'])

  return( 
    <Container>
      {otherUSers && <CardContainer className="tinderCards_cardContainer">
        {otherUSers.map(person => (
          <TinderCard
            className="swipe"
            key={person.nome}
            preventSwipe={['up', 'down']}
          >
            <Div
              style={{ backgroundImage: `url(http://localhost:3333/image/${person.image})` }}
              className="card"
            >
              <h3>{person.nome}</h3>
            </Div>
          </TinderCard>
        ))}
      </CardContainer>}
      <SwipeButtons/>
    </Container>
  );
}

export default TinderCards;