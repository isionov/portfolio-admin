import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import TextCustom from "../TextCustom";
import { colors, media } from "../../modules/params.js";
import RectButton from "../RectButton";
import Input from "../Input";
import styled from "styled-components";
import {
  worksLoadImgAction,
  worksErrorLoadImageAction
} from "../../modules/Works";
import { getLoadImgError } from "../../modules/Works";
import { connect } from "react-redux";

const StyledFlexWrapper = styled(FlexContainer)`
  height: 275px;
  border: ${({ dashedCustom }) =>
    dashedCustom
      ? `2px dashed ${colors.commonDarkColor}`
      : `2px solid ${colors.commonDarkColor}`};
  background: ${({ customBG }) => customBG};
  position: relative;

  @media (max-width: ${`${media.phones}`}) {
    height: 160px;
  }
`;

const StyledInput = styled(Input)`
  width: 0;
  height: 0;
`;

const StyledTextCustom = styled(TextCustom)`
  line-height: 34px;
  font-size: 16px;
  width: 225px;
  margin: 0 0 25px 0;

  @media (max-width: ${`${media.tablets}`}) {
    display: none;
  }
`;

const StyledErrorTextCustom = styled(TextCustom)`
  font-size: 16px;
  position: absolute;
  bottom: -20px;
  left: 0;
  color: ${colors.commonErrorColor};
`;

const StyledRectButton = styled(RectButton)`
  margin: 0 10px 10px 0;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  background: linear-gradient(
    to right,
    ${colors.commonColorAddBtnFirst},
    ${colors.commonColorAddBtnSecond}
  );
  color: ${colors.commonColorRectBtnTextHover};
  &:focus {
    border: 2px solid ${colors.commonOutlignColor};
  }

  @media (max-width: ${`${media.tablets}`}) {
    position: absolute;
    margin: 0;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    padding: 4px 8px;
    background: transparent;
    color: ${`${colors.commonLinkColor}`};
    &:hover {
      background: linear-gradient(
        to right,
        ${colors.commonColorAddBtnFirst},
        ${colors.commonColorAddBtnSecond}
      );
      color: ${colors.commonColorRectBtnTextHover};
    }
  }

  @media (max-width: ${`${media.phones}`}) {
    font-size: 14px;
  }
`;

class WorksImageLoader extends Component {
  state = { localImg: null, dashedCustom: false };

  myRef = React.createRef();
  myDropeZone = React.createRef();

  handleClick = (e) => {
    this.myRef.current.click();
  };

  handleChange = (e) => {
    const { worksLoadImgAction, worksErrorLoadImageAction } = this.props;
    const formData = new FormData();
    const [file] = e.target.files;

    if (file) {
      if (file.size > 1500 * 1024) {
        alert("Слишком большой файл");
      } else {
        worksLoadImgAction(file);
        worksErrorLoadImageAction(false);
      }
    }
  };

  dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    this.setState({ ...this.state, dashedCustom: true });
  };

  dragLeave = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, dashedCustom: false });
  };

  fileSelect = (e) => {
    const { worksLoadImgAction, worksErrorLoadImageAction } = this.props;
    let file = e.dataTransfer.files[0];

    e.preventDefault();
    worksLoadImgAction(file);
    worksErrorLoadImageAction(false);
  };

  componentDidMount() {
    const { currentImg } = this.props;
    const { localImg } = this.state;

    if (currentImg && typeof currentImg === "string") {
      this.setState({ localImg: currentImg });
    }

    if (this.myDropeZone.current) {
      this.myDropeZone.current.addEventListener("dragover", this.dragOver);
      this.myDropeZone.current.addEventListener("drop", this.fileSelect);
      this.myDropeZone.current.addEventListener("dragleave", this.dragLeave);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const oldImg = prevProps.currentImg;
    const { currentImg } = this.props;
    const fileReader = new FileReader();
    const { localImg } = this.state;

    if (currentImg && typeof currentImg !== "string" && oldImg !== currentImg) {
      fileReader.readAsDataURL(currentImg);
      fileReader.addEventListener("load", (e) => {
        this.setState({ localImg: fileReader.result });
      });
    } else if (oldImg !== currentImg) {
      this.setState({ localImg: currentImg });
    }
  }

  componentWillUnmount() {
    if (this.myDropeZone.current) {
      this.myDropeZone.current.removeEventListener("dragover", this.dragOver);
      this.myDropeZone.current.removeEventListener("drop", this.fileSelect);
      this.myDropeZone.current.removeEventListener("dragleave", this.dragLeave);
    }
  }

  render() {
    const { localImg, dashedCustom } = this.state;
    const { errorLoad } = this.props;
    const customBG = localImg
      ? `url(${localImg}) center center / cover no-repeat`
      : `${colors.bgImgContainer}`;

    return (
      <>
        <StyledFlexWrapper
          customWidth="100%"
          flexDirection="column"
          customBG={customBG}
          dashedCustom={dashedCustom}
          ref={this.myDropeZone}
        >
          <StyledInput
            ref={this.myRef}
            type="file"
            onChange={this.handleChange}
            id="loadImg"
            name="loadImg"
            width="0"
            height="0"
          />
          <StyledTextCustom>
            Перетащите или загрузите для добавления изображения
          </StyledTextCustom>
          <StyledRectButton onClick={this.handleClick} type="button">
            загрузить
          </StyledRectButton>
          {errorLoad ? (
            <StyledErrorTextCustom>
              Необходимо добавить картинку
            </StyledErrorTextCustom>
          ) : null}
        </StyledFlexWrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  errorLoad: getLoadImgError(state)
});

const mapDispatchToProps = { worksLoadImgAction, worksErrorLoadImageAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorksImageLoader);
