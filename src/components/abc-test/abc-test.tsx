import { Component } from '@stencil/core';

@Component({
    tag: 'abc-test' ,
    styleUrl: 'abc-test.css'
})
export class ABCTest {

    render() {
        return (
            <div>
                <h1>Test Execution</h1>
            </div>
        );
    }
}