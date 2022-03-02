import styled from "styled-components";

export const Container = styled.div`
    min-height:100vh;
    background-image: url('/assets/bg3.jpg');
    background-position:center;
    background-size:cover;
    background-repeat: no-repeat;
`;

export const Area = styled.div`
    margin:auto;
    max-width:980px;
    @media (max-width:1024px) {
        padding:0px 45px;
    }
`;

export const Menu = styled.div`
    display:flex;
    align-items:center;
    justify-content: space-between;
    padding:20px 0;
    color: #333;
    font-size:20px;
    border-bottom:1px solid rgba(0, 0, 0, 0.2);
    .logo {
        display:flex;
        align-items:center;
        justify-content: center;
        img {
            width:40px;
            height:40px;
        }
    }
    .menuItem {
        
        ul {
            display:flex;
            list-style: none;
            
            li {
                padding:0 15px;
                
                span {
                    cursor:pointer;
                    font-weight:300;
                    &:hover {
                        transition: ease all 0.3s;
                        font-weight:600;
                    }
                }
            }
            
            .active {
                font-weight:600;
            }
        }
    }
    .menuOptions {
        display:flex;
        align-items:center;
        justify-content: center;
        .menuOptionsItem {
            display:flex;
            align-items:center;
            justify-content: center;
            padding:0 15px;
            
            img {
                width:24px;
                height:24px;
                cursor:pointer;
            }
            .avatar {
                width:40px;
                height:40px;
                border-radius: 50%;
            }
        }
    }
`;

export const Body = styled.div`
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top:80px;
    @media (max-width:1024px) {
        margin-top:120px;
    }
    @media (max-width:768px) {
        margin-top:80px;
    }
`;

export const Title = styled.h1`
    margin:0;
    padding:0;
    font-size:70px;
    font-weight:700;
`;

export const SubTitle = styled.h1`
    margin:0;
    padding:0;
    font-size:40px;
    font-weight:500;
`;

export const Desc = styled.p`
    margin-top:15px;
    margin-bottom:40px;
    font-weight: 400;
`;

export const Button = styled.div`
    button {
        display:flex;
        align-items:center;
        justify-content: center;
        background-color: #FAFAFA;
        padding:15px;
        font-weight:bold;
        box-shadow: 3px 3px 15px #FFF;
        border:0;
        border-radius: 5px;
        cursor:pointer;
        outline:0;
        
        img {
            margin-left:5px;
            width:16px;
            height:16px;
        }
    }
`;