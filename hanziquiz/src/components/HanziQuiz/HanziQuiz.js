import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import '../../bootstrap.min.css';
import {PropTypes} from 'prop-types';

function Hero() {
    return (<div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Hanzi Quíz</h1>
        <p>Válasszátok ki a kínai karakter magyar jelentését!</p>
          <p>Gyakoroljátok a helyes vonalsorrendet, írást! :)</p>
      </div>
    </div>);
}

function Turn({hanzi, hungarianMeanings, highlight, onAnswerSelected}) {
    function highlightToBgColor(highlight) {
        const mapping = {
            'none': '',
            'correct': 'green',
            'wrong': 'red'
        };
        return mapping[highlight];
    }


    return (
      <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
        <div className="col-4 offset-1">
          <img src={hanzi.imageUrl} className="hanziimage" alt="Hanzi"/>
        </div>
        <div className="col-6">
            {hungarianMeanings.map((meaning) => <Hungarian meaning={meaning} key={meaning} onClick={onAnswerSelected}/>)}
        </div>
      </div>
    );
}

function Hungarian({pinyin, meaning, onClick}) {
    return (
        <div className="answer" onClick={() => {onClick(meaning);}}>
            <h4>{meaning}</h4>
        </div>
    );
}

Turn.propTypes = {
    hanzi: PropTypes.shape({
        pinyin: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        imageSource: PropTypes.string.isRequired,
        hungarianMeanings: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    hungarianMeanings: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    highlight: PropTypes.string.isRequired
};

function Continue({show, onContinue}) {
    return (
        <div className="row continue">
            {show
            ? <div className="col-11">
                    <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Következő</button>
                </div>
            : null }
        </div>
    );
}


function Footer() {
    return (
        <div id="footer" className="row">
          <div className="col-12">
              <p className="text-muted credit">Minden kép (gif) a
                  <a href={'https://dictionary.writtenchinese.com/'}>  Written Chinese </a>
                  Online szótárban található.
              </p>
              <p className="text-muted credit">Made by <a href={"https://www.facebook.com/mentalingua/"}>MENTALINGUA</a></p>
          </div>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        turnData: state.turnData,
        highlight: state.highlight
    };
}

function mapDispatchToProps(dispatch) {
    return {
      onAnswerSelected: (answer) => {
          dispatch({ type: 'ANSWER_SELECTED', answer });
      },
        onContinue: () => {
          dispatch({ type: 'CONTINUE' });
        }
    };
}

const HanziQuiz = connect(mapStateToProps, mapDispatchToProps)(function({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight === "correct"} onContinue={onContinue}/>
        <Footer />
      </div>
    );
  });


export default HanziQuiz;
