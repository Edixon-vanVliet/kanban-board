/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const color = "#ddd";

const Tag = styled.div`
  background-color: ${color};
  border-radius: 5px;
  width: 16px;
  height: 16px;
`;

const Title = styled.h4`
  background-color: ${color};
  width: 100%;
  height: 21.6px;
  margin-block-start: 1.5em;
  margin-block-end: 1.33em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin-top: 25px;
  border-radius: 5px;
`;

const Description = styled.div`
  margin: 16px 0;
  width: 100%;
  height: 100px;
`;

const DescriptionText = styled.div`
  background-color: ${color};
  width: 100%;
  height: 12.6px;
  margin: 9px 0;
  border-radius: 5px;
`;

const Text = styled.p`
  background-color: ${color};
  width: 100px;
  height: 21.6px;
  border-radius: 5px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

const loading = keyframes`
  0% {transform: translateX(-150%)}
  50% {transform: translateX(-60%)}
  100% {transform: translateX(150%)}
`;

const Shimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${loading} 2.5s infinite;
  & div {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    transform: skewX(-20deg);
    box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.08);
  }
`;

const styles = { Tag, Title, Description, DescriptionText, Text, Shimmer };

export default styles;
