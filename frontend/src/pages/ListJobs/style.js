import styled from 'styled-components';

export const ContainerListJobs = styled.div`

    .container{
        padding: 1rem;
        border-bottom: solid 0.25rem;
        border-color: var(--cyan);
    }

    .box{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .title {
        padding-bottom: 1rem;
    }

    .mainbox {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .box figure {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }


`

export const figure = styled.div`

`