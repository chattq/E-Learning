import { Button } from "antd";
import styled from "styled-components";

export const ListItem = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 25px;
  margin-left: 40px;
  p {
    margin-left: 20px;
  }
  span {
    font-weight: bold;
  }
`;

export const ButtonEdit = styled(Button)`
  background-color: white;
  color: #ed7e01;
  border: 1px solid #ed7e01;
  text-align: center;
  margin-left: 40%;
  margin-bottom: 30px;
  width: 100px;
  &:hover {
    background-color: #ed7e01 !important;
    color: white !important;
    border: 1px solid #ed7e01 !important;
  }
`;

export const ButtonReMove = styled(Button)`
  background-color: white;
  color: #bb0000;
  border: 1px solid #bb0000;
  margin: 0 20px;
  &:hover {
    background-color: #bb0000 !important;
    color: white !important;
    border: 1px solid #ed7e01 !important;
  }
`;
