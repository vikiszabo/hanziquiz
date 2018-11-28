import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './AddHanziForm.css';


class HanziForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinyin: '',
            imageUrl: '',
            hungarianMeanings: [],
            meaningTemp: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddHanzi = this.handleAddHanzi.bind(this);
    }
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleAddHanzi(event) {
        this.setState({
            hungarianMeanings: this.state.hungarianMeanings.concat([this.state.meaningTemp]),
            meaningTemp: ''
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddHanzi(this.state);
    }

    render() {
        return <form  onSubmit={this.handleSubmit}>
            <div className="AddHanziForm_input">
                <label htmlFor="name">Pinyin</label>
                <input type="text" name="pinyin" value={this.state.pinyin} onChange={this.onFieldChange}/>
            </div>
            <div className="AddHanziForm_input">
                <label htmlFor="imageUrl">Kép URL-je</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl}  onChange={this.onFieldChange}/>
            </div>
            <div className="AddHanziForm_input">
                {this.state.hungarianMeanings.map((meaning) => <p key={meaning}>{meaning}</p>)}
                <label htmlFor="meaningTemp">Magyar jelentések</label>
                <input type="text" name="meaningTemp" value={this.state.meaningTemp} onChange={this.onFieldChange} />
                <input type="button" value="+" onClick={this.handleAddHanzi} />
            </div>
            <input type="submit" value="Add"/>
        </form>;
    }
}

function AddHanziForm({match, onAddHanzi}) {
    return <div className="AddHanziForm">
        <h1>Új Karakter</h1>
        <HanziForm onAddHanzi={onAddHanzi}/>
    </div>;

}

function mapDispatchToProps(dispatch, props) {
    return {
      onAddHanzi: (hanzi) => {
          dispatch({ type: 'ADD_HANZI', hanzi});
          props.history.push('/');
      }
    };
}

export default withRouter(connect(() => {}, mapDispatchToProps)(AddHanziForm));