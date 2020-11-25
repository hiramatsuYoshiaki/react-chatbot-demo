import React from "react";
import defaultDataset from "./dataset.js";
import "./assets/styles/style.css";
import { AnswerList, Chats } from "./components/index";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
  }
  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question",
    });
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    });
  };
  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "init":
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;
      default:
        const chats = this.state.chats;
        const chat = {
          text: selectedAnswer,
          type: "answer",
        };
        chats.push(chat);
        this.setState({ chats: chats });
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  };

  // initAnswer = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   const initAnswers = initDataset.answers;
  //   this.setState({
  //     answers: initAnswers,
  //   });
  // };
  // initChats = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   const chat = {
  //     text: initDataset.question,
  //     type: "question",
  //   };
  //   const chats = this.state.chats;
  //   chats.push(chat);
  //   this.setState({
  //     chats: chats,
  //   });
  // };
  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId);
    // this.initAnswer();
    // this.initChats();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }
  render() {
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            {/* <h1> Chatbot Demo #6</h1>
            <h1> 日本一わかりやすいReact入門</h1> */}
            <Chats chats={this.state.chats} />
            <AnswerList
              answers={this.state.answers}
              select={this.selectAnswer}
            />
          </div>
        </section>
      </div>
    );
  }
}
