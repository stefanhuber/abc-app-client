import { Component, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
    tag: 'abc-test' ,
    styleUrl: 'abc-test.css'
})
export class ABCTest {

    @Prop()
    match: MatchResults;

    @State()
    test;

    componentWillLoad() {
        let code = this.match.params.code;
        fetch('http://localhost/abc-app/tests/' + code)
            .then(response => {
                return response.json();
            }).then(json => {
                this.test = json;
            });
    }

    render() {
        if (this.test) {

            let questions = [];
            for (let questionObject of this.test.questions) {
                let answers = [];
                for (let answerObject of questionObject.answers) {
                    answers.push(<div>
                        <label>
                            <input name={ questionObject.question.id } value={ answerObject.id } type="checkbox" /> { answerObject.answer }
                        </label>
                    </div>);
                }

                let questionHtml = (
                    <fieldset>
                        <legend>{ questionObject.question.question }</legend>
                        { answers }
                    </fieldset>
                );
                questions.push(questionHtml);
            }

            return (
                <div>
                    <h1>Test Execution: { this.test.title }</h1>
                    <form>
                        { questions }
                    </form>
                </div>
            );
        } else {
            return (<p>Loading Test</p>);
        }        
    }
}