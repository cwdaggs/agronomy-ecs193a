import styled from "styled-components";

export const Container = styled.div`
    min-height:90vh;
    padding-top: 50px;
`;

export const Area = styled.div`
    margin:auto;
    max-width:80vw;
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
    margin-top:5%;
`;

export const Title = styled.h1`
    margin:0;
    padding:0;
    font-size:60px;
    font-weight:600;
`;

export const ProfileTitle = styled.h1`
    margin:0;
    padding:0;
    font-size:60px;
    font-weight:600;
    width: 100%;
    padding: 5px;

    @media (max-width: 400px) {
        font-size: 40px;
    }
`;

export const SubTitle = styled.h1`
    margin:0;
    padding:0;
    font-size:50px;
    font-weight:500;

    @media (max-width: 1350px) {
        font-size:40px;
    }

    @media (max-width: 1000px) {
        font-size:30px;
    }
    
    @media (max-width: 730px) {
        font-size:20px;
    }
    
    @media (max-width: 400px){
        font-size:15px;
    }
`;

export const Desc = styled.p`
    margin-top:15px;
    margin-bottom:5%;
    font-weight: 400;
    font-size: 22px;

    @media (max-width: 1350px) {
        font-size:18px;
    }

    @media (max-width: 1000px) {
        font-size:14px;
    }
    
    @media (max-width: 730px) {
        font-size:12px;
    }
    
    @media (max-width: 400px){
        font-size:10px;
    }
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