import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';

import { Container, Image, HeaderIcon } from './styles';

function Header({ backButton }) {
  const history = useHistory();

  return(
    <Container className="header">
      {backButton ? (
        <HeaderIcon>
          <IconButton onClick={() => history.replace(backButton)}>
            <ArrowBackIcon fontSize="large" className="header_icon" />
          </IconButton>
        </HeaderIcon>
      ) : (
        <HeaderIcon>
          <IconButton>
            <PersonIcon onClick={() => history.replace('/profile')} className="header__icon" fontSize="large" />
          </IconButton>
        </HeaderIcon>
      )}

      <Link to="/">
        <h4>Tinder Empresarial</h4>
      </Link>

      <HeaderIcon>
        <Link to="/chat">
          <IconButton>
            <ForumIcon className="header__icon" fontSize="large" />
          </IconButton>
        </Link>
      </HeaderIcon>
    </Container>
  ) ;
}

export default Header;