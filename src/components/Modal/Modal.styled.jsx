import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalTab = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  position: relative;
`;

export const TagsBox = styled.div`
width: 100%;
height: 80px;
position: absolute;
bottom: -10px;
right: 0;
background-color: #242121;
padding: 10px;
opacity: 0.5;
transition: opacity 250ms linear 300ms;
`

export const TagsText = styled.p`
color: #fff;
font-size: 20px;
`
export const IconButton =styled.span`
width: 48px;
height: 48px;
border-radius: 50%;
opacity: 0.5;
background-color: #242121;
position: absolute;
top: 50%;
right: 0;
transition: opacity 300ms linear;
&:hover,
&:focus {
  opacity: 1;
}
`

export const RightIconButton =styled(IconButton)`
right: 20px;
`

export const LeftIconButton =styled(IconButton)`
left: 20px;
`