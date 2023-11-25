import styled from 'styled-components';
import imageProfile from '../../assets/profile.jpg'
import pencil from '../../assets/pencil.svg'

export const ContainerProfile = styled.div`

    .image-profile{
        height: 15rem;
        width: 100%;
        background-image: url(${imageProfile});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
    }

    .image-profile input {
        display: none;
    }

    .image-profile label {
        position: absolute;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        left: 70%;
        top: 85%;
        background-image: url(${pencil});
        background-position: center;
        //background-size: cover ;
        background-repeat: no-repeat;
        background-color: #f73451; 
    }

    .image-profile label:hover{
        background-color: #a10b22;
        //zoom: 1.1;
    }

    .data-profile{
        padding: 2rem 2rem 0 2rem;
    }

    .btn-area{
        width: 100%;
        display: flex;
        justify-content: end ;
    }

    .btn-area button{
        padding: .6rem;
        margin-left: .5rem;
        margin-top: .5rem;
    }

    .jobs-vacancies{
        padding: 0 2rem 2rem 2rem;
    }

    .jobs-vacancies h2{
        border-top: 3px solid cyan;
        margin-top: 1rem;
        padding-top: 0.5rem;
    }

    .jobs-vacancies .btn-box{
        display: flex;
        flex-direction: column;
    }

    .delete{
        padding: 2rem;
        display: flex;
        flex-direction: column;
    }

`