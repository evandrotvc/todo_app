import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    background-color: #20212C;
    padding: 10px;
    border: 1px solid;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;
    transition: 0.3s all;
    cursor: pointer;

    input {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    label {
        color: #CCC;
        text-decoration: 'initial';
    }

    &:hover{
      border-color: green;
      transform: translateX(10px)
    }
`;