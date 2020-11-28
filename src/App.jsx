//------------------------------------------------------------------------
// function
//------------------------------------------------------------------------
import React, { useState, useEffect, useCallback } from "react";
// import defaultDataset from "./dataset.js";
import "./assets/styles/style.css";
import { AnswerList, Chats } from "./components/index";
import FormDialog from "./components/Forms/FormDialog";
import { db } from "./firebase/index";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);
  // this.state = {
  //   answers: [],
  //   chats: [],
  //   currentId: "init",
  //   // dataset: defaultDataset,
  //   dataset: {},
  //   open: false,
  // };
  // this.selectAnswer = this.selectAnswer.bind(this);
  // this.handleClose = this.handleClose.bind(this);
  // this.handleClickOpen = this.handleClickOpen.bind(this);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    // const chats = this.state.chats;
    // chats.push({
    //   text: this.state.dataset[nextQuestionId].question,
    //   type: "question",
    // });
    addChats({
      text: nextDataset.question,
      type: "question",
    });
    // this.setState({
    //   answers: this.state.dataset[nextQuestionId].answers,
    //   chats: chats,
    //   currentId: nextQuestionId,
    // });
    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  };
  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      // case nextQuestionId === "init":
      //   setTimeout(
      //     () => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),
      //     500
      //   );
      //   break;
      case nextQuestionId === "contact":
        handleClickOpen();
        break;
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;
      default:
        // const chats = chats;
        // const chat = {
        //   text: selectedAnswer,
        //   type: "answer",
        // };
        // chats.push(chat);
        // this.setState({ chats: chats });
        addChats({
          text: selectedAnswer,
          type: "answer",
        });
        setTimeout(
          () => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),
          1000
        );
        break;
    }
  };
  const addChats = (chat) => {
    //現在のステートを引数で渡せる、新しいく追加する。
    setChats((prevChats) => {
      //現在のステートに新しいく追加する。pushと同様
      return [...prevChats, chat];
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // const initDataset = (dataset) => {
  //   this.setState({ dataset: dataset });
  // };
  // componentDidMount() {
  //   (async () => {
  //     const dataset = this.state.dataset;
  //     await db
  //       .collection("questions")
  //       .get()
  //       .then((snapshots) => {
  //         snapshots.forEach((doc) => {
  //           dataset[doc.id] = doc.data();
  //         });
  //       });
  //     this.initDataset(dataset);
  //     const initAnswer = "";
  //     this.selectAnswer(initAnswer, this.state.currentId);
  //   })();

  //   // this.initAnswer();
  //   // this.initChats();
  // }
  useEffect(() => {
    (async () => {
      const initDataset = {};

      await db
        .collection("questions")
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            initDataset[doc.id] = doc.data();
          });
        });

      // this.initDataset(dataset);
      // const initAnswer = "";
      // this.selectAnswer(initAnswer, this.state.currentId);
      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();

    // this.initAnswer();
    // this.initChats();
    //空の配列を第二引数にして、マウント後に一回だけ実行する（componentDidMount）
  }, []);

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const scrollArea = document.getElementById("scroll-area");
  //   if (scrollArea) {
  //     scrollArea.scrollTop = scrollArea.scrollHeight;
  //   }
  // }
  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
    //第二引数になにも指定せずに毎回実行させる（ componentDidUpdate）
  });
  return (
    <div>
      <section className="c-section">
        <div className="c-box">
          {/* <h1> Chatbot Demo #6</h1>
            <h1> 日本一わかりやすいReact入門</h1> */}
          <Chats chats={chats} />
          <AnswerList answers={answers} select={selectAnswer} />
          <FormDialog open={open} handleClose={handleClose} />
        </div>
      </section>
    </div>
  );
};
export default App;
//------------------------------------------------------------------------
// class
//------------------------------------------------------------------------
// import React from "react";
// // import defaultDataset from "./dataset.js";
// import "./assets/styles/style.css";
// import { AnswerList, Chats } from "./components/index";
// import FormDialog from "./components/Forms/FormDialog";
// import { db } from "./firebase/index";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       answers: [],
//       chats: [],
//       currentId: "init",
//       // dataset: defaultDataset,
//       dataset: {},
//       open: false,
//     };
//     this.selectAnswer = this.selectAnswer.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.handleClickOpen = this.handleClickOpen.bind(this);
//   }
//   displayNextQuestion = (nextQuestionId) => {
//     const chats = this.state.chats;
//     chats.push({
//       text: this.state.dataset[nextQuestionId].question,
//       type: "question",
//     });
//     this.setState({
//       answers: this.state.dataset[nextQuestionId].answers,
//       chats: chats,
//       currentId: nextQuestionId,
//     });
//   };
//   selectAnswer = (selectedAnswer, nextQuestionId) => {
//     switch (true) {
//       case nextQuestionId === "init":
//         setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
//         break;
//       case nextQuestionId === "contact":
//         this.handleClickOpen();
//         break;
//       case /^https:*/.test(nextQuestionId):
//         const a = document.createElement("a");
//         a.href = nextQuestionId;
//         a.target = "_blank";
//         a.click();
//         break;
//       default:
//         const chats = this.state.chats;
//         const chat = {
//           text: selectedAnswer,
//           type: "answer",
//         };
//         chats.push(chat);
//         this.setState({ chats: chats });
//         setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
//         break;
//     }
//   };

//   // initAnswer = () => {
//   //   const initDataset = this.state.dataset[this.state.currentId];
//   //   const initAnswers = initDataset.answers;
//   //   this.setState({
//   //     answers: initAnswers,
//   //   });
//   // };
//   // initChats = () => {
//   //   const initDataset = this.state.dataset[this.state.currentId];
//   //   const chat = {
//   //     text: initDataset.question,
//   //     type: "question",
//   //   };
//   //   const chats = this.state.chats;
//   //   chats.push(chat);
//   //   this.setState({
//   //     chats: chats,
//   //   });
//   // };
//   handleClickOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };
//   initDataset = (dataset) => {
//     this.setState({ dataset: dataset });
//   };
//   componentDidMount() {
//     (async () => {
//       const dataset = this.state.dataset;
//       await db
//         .collection("questions")
//         .get()
//         .then((snapshots) => {
//           snapshots.forEach((doc) => {
//             dataset[doc.id] = doc.data();
//           });
//         });
//       this.initDataset(dataset);
//       const initAnswer = "";
//       this.selectAnswer(initAnswer, this.state.currentId);
//     })();

//     // this.initAnswer();
//     // this.initChats();
//   }
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     const scrollArea = document.getElementById("scroll-area");
//     if (scrollArea) {
//       scrollArea.scrollTop = scrollArea.scrollHeight;
//     }
//   }
//   render() {
//     return (
//       <div>
//         <section className="c-section">
//           <div className="c-box">
//             {/* <h1> Chatbot Demo #6</h1>
//             <h1> 日本一わかりやすいReact入門</h1> */}
//             <Chats chats={this.state.chats} />
//             <AnswerList
//               answers={this.state.answers}
//               select={this.selectAnswer}
//             />
//             <FormDialog open={this.state.open} handleClose={this.handleClose} />
//           </div>
//         </section>
//       </div>
//     );
//   }
// }
