import { styled } from 'styled-components';

export const HomeContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-around;

	width: 45rem;
	height: calc(100vh - 10rem);
	margin: 5rem auto;

	background: ${props => props.theme['gray-700']};
	border-radius: 8px;

	form {
		width: 40%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media (max-width: 680px) {
		width: 90%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		margin: 5rem auto;
	}
`;

export const FormContainer = styled.div`
	input {
		width: 100%;
		height: 2.5rem;

		background: transparent;
		border: 0;
		border-bottom: 2px solid ${props => props.theme['gray-500']};
		font-weight: bold;
		font-size: 1.125rem;
		padding: 0 0.5rem;

		color: ${props => props.theme['gray-100']};

		&:focus {
			box-shadow: none;
			border-bottom: 2px solid ${props => props.theme['purple-500']};
		}
	}
`;

export const ButtonForm = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
    gap: 0.5rem;

    height: 2rem;
    border-radius: 8px;
    border: 0;
    padding: 1rem;
    cursor: pointer;
    font-weight: bold;

	background: ${props => props.theme['purple-500']};
	color: ${props => props.theme['gray-800']};

    &:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

    &:not(:disabled):hover{
        background: ${props => props.theme['purple-700']};
    }
`;

export const DetailContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
    gap: 0.5rem;

	h1 {
		font-size: 3rem;
		font-weight: bold;
	}

	span {
		color: ${props => props.theme['gray-400']};
		font-size: 1.125rem;
	}

	p {
		font-size: 1.5rem;
	}
`;
