import styled from 'styled-components';

export const ContainerPlans = styled.div`
    padding: 2rem;

    .box{
        border: 1px solid var(--blue);
        padding: 1rem;
        border-radius: .75rem;
        margin-bottom: 1rem;
    }

    .box h2{
        margin-bottom: 1rem;
    }
    .box p{
        margin-bottom: 1rem;
    }
    .box div{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .applied{
        background: green;
    }

`