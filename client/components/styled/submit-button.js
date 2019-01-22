import styled, { withTheme } from 'styled-components';

const SubmitButton = styled.button`
    width: 100%;
    height: 4.5rem;
    margin-top: 1rem;
    background-color: ${props => props.theme.btnColor1};
    color: #FFFFFF;
    border-radius: 20px;
    font-size: 2rem;
`;

export default withTheme(SubmitButton);