import styled from 'styled-components';
import bg from "../../assets/leadspacee.jpg";

export const CardLogin = styled.div`
    .card{
        border-radius: 1rem;
        border: 1px solid #D8D8D8;
        width: 20rem;
        max-height: 80vh;
        padding: 1rem;
        overflow: auto;
    }
    .bg{
        background-image: url(${bg});
        background-color: #111;
        width: 100vw;
        height: 100vh;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .boxContent{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .forgotPassword{
        color: var(--cyan);
        border-bottom: 1px solid var(--cyan);
        font-size: .75rem;
        margin-left: 11.25rem;
    }


    .inputBox{
        text-align: center;
        padding: 0 1.25rem;
        margin-bottom: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h2{
            color: var(--light);
            font-size: 1rem;
            margin-bottom: 1rem;
        }


    }

    .buttonBox{
        display: flex;
        flex-direction: column;
        padding: 0 1.25rem;
        margin-top: .75rem;
        margin-bottom: 2.5rem;
    }

    .btn-primary{
  border-radius: .5rem;
  background: var(--gradient);
  color: var(--light);
  font-weight: 700;
  padding: .75rem 0;
  outline-style: none;
  
}

.btn-secondary{
  border-radius: .5rem;
  background-color: var(--light);
  color: var(--cyan);
  font-weight: 700;
  padding: .75rem 0;
}

.input{
  border-radius: .5rem;
  border: 1px solid #D8D8D8;
  background-color: var(--light);
  padding: .75rem;
  width: 100%;
}

.mb-2{
    margin-bottom: 1rem;
}



.img{
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    border: 2px solid var(--blue);
    margin-bottom: 1rem;
    input{
        display: none;
    }
}

`