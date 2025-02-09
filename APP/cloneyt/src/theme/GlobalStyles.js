import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body{
        margin: 0;
        font-family: sans-serif;
        background-color: #0f0f0f;
    }
    *{
        font-family: 'Rubik', sans-serif;
        box-sizing: border-box;
        margin: 0;
    }
    input, button, select, textarea, option{
        font-family: 'Rubik', sans-serif;
    }
    a{
        color: black;
    }
    body::-webkit-scrollbar {
		width: 10px;
        height: 10px;
	}
    body::-webkit-scrollbar-track{
        background-color: white;
    }
    body::-webkit-scrollbar-thumb {
		background-color: black;
	}
`;