import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import { colors, media } from "../../modules/params.js";
import RectButton from "../RectButton";
import Input from "../Input";
import TextCustom from "../TextCustom";
import styled from "styled-components";
import { revsLoadImgAction } from "../../modules/Revs";
import { getLoadImgError } from "../../modules/Revs";
import { connect } from "react-redux";
import manIcon from "../../images/content/man-user.png";

const StyledFlexWrapper = styled(FlexContainer)`
  position: relative;
  border: ${({ dashedCustom }) =>
    dashedCustom
      ? `1px dashed ${colors.commonDarkColor}`
      : "1px dashed transparent"};
  min-height: 275px;

  @media (max-width: ${`${media.tablets}`}) {
    margin-bottom: 25px;
  }
`;

const StyledInput = styled(Input)`
  position: absolute;
  width: 0;
  height: 0;
`;

const StyledFlexContainer = styled(FlexContainer)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 0 25px 0;
  position: relative;
  background: ${colors.bgImgContainer};
  &:after {
    content: "";
    background: ${({ customBG }) => customBG};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const StyledRectButton = styled(RectButton)`
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 0 0;
  padding: 7px 14px;
  cursor: pointer;
  background: transparent;
  color: ${colors.commonColorRectBtnText};
  &:focus {
    border: 2px solid ${colors.commonOutlignColor};
  }
  &:hover {
    color: ${colors.commonColorRectBtnTextHover};
    background: linear-gradient(
      to right,
      ${colors.commonColorAddBtnFirst},
      ${colors.commonColorAddBtnSecond}
    );
  }
`;

const StyledErrorTextCustom = styled(TextCustom)`
  position: absolute;
  bottom: -10px;
  left: 0;
  color: ${colors.commonErrorColor};
`;

class RevsImageLoader extends Component {
  state = { localImg: null, dashedCustom: false };

  myRef = React.createRef();
  myDropeZone = React.createRef();

  handleClick = (e) => {
    this.myRef.current.click();
  };

  dragOver = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, dashedCustom: true });
  };

  dragLeave = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, dashedCustom: false });
  };

  fileSelect = (e) => {
    const { revsLoadImgAction } = this.props;
    let file = e.dataTransfer.files[0];

    e.preventDefault();
    revsLoadImgAction(file);
  };

  handleChange = (e) => {
    const { revsLoadImgAction } = this.props;
    const [file] = e.target.files;

    if (file) {
      if (file.size > 1500 * 1024) {
        alert("Слишком большой файл");
      } else {
        revsLoadImgAction(file);
      }
    }
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
      : `url(${manIcon}) center center / 45% no-repeat`;

    return (
      <>
        <StyledFlexWrapper
          minHeight="275px"
          customWidth="100%"
          flexDirection="column"
          dashedCustom={dashedCustom}
          ref={this.myDropeZone}
        >
          <StyledInput
            ref={this.myRef}
            type="file"
            onChange={this.handleChange}
            id="revLoadImg"
            name="revLoadImg"
          />
          <StyledFlexContainer customBG={customBG} />
          <StyledRectButton onClick={this.handleClick} type="button">
            Добавить фото
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

const mapDispatchToProps = { revsLoadImgAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevsImageLoader);
