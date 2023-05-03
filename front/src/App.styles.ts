import styled from 'styled-components';

export const Container = styled.div`
    background-color: #17181F;
    color: #797A81;
    min-height: 100vh;
`;

export const Area = styled.div`
    margin: auto;
    max-width: 980px;
    padding: 10px;
`;

export const Header = styled.h1`
    margin: 0;
    padding: 0;
    color: #FFF;
    text-align: center;
    border-bottom: 1px solid #444;
    padding-bottom: 20px;
`;

export const IconBack = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;

    svg{
        transition: 0.5s all;

        &:hover {
            fill: red;
        }
    }
`;