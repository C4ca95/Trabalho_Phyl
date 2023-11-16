import React, {useState, useEffect} from 'react';
import TinderCard from 'react-tinder-card';

import database from '../../Firebase/Firebase';
import { Container, Div, CardContainer } from './styles';

function TinderCards() {
  const [people, setPeople] = useState([
    {
      url: 'https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.3325990:1674218339/Google.jpg?f=16x9&h=720&q=0.8&w=1280&$p$f$h$q$w=62fc6d3',
      name: 'Google'
    }, {
      url: 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*Z3rSj8K19g6tSNWxAki13Q.jpeg',
      name: 'apple'
    }
  ]);

  useEffect(() => {
   

  }, [])
 // const people = [];
  //people.push = [];

  //setPeople([...people, 'sonny', 'quazi'])

  return( 
    <Container>
      <CardContainer className="tinderCards_cardContainer">
        {people.map(person => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}
          >
            <Div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </Div>
          </TinderCard>
        ))}
      </CardContainer>
    </Container>
  );
}

export default TinderCards;