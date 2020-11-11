import React, {Component} from "react";


import{
    Container,
    Row,
    Col,
} from 'react-bootstrap';

export default class Node extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            nodepairs: [],
            myId: 0,
            myParentId: 0,
            myName: ''
        };
    }

    componentDidMount() {
        fetch(`https://localhost:5001/api/nodepairs/` + this.state.myParentId)
        .then(response => response.json())
        .then(data => this.setState({ nodepairs: data }));
            
    }

    handleOnChange(childId){
        fetch(`https://localhost:5001/api/nodepairs/` + childId)
        .then(response => response.json())
        .then(data => this.setState({ myName: data.nodeName }));
    }

    render(){

        var myParentId = this.props.nodeId;
        var {nodepairs} = this.state

        const NodeField = ({nodeId, nodeName}) => <Row style={{marginLeft: '50px'}}>
        <Col>{nodeId}</Col>
        <Col id={nodeId} onDoubleClick={() => this.handleDoubleClick(nodeId, nodeName)}>{nodeName}</Col>
        </Row>

        return(
            <Row>
        {nodepairs.map(childItem => (
            <Container>
            <NodeField onChange={() => this.handleOnChange(childItem.nodeId)} nodeId={childItem.nodeId}></NodeField>
            </Container>
        ))}
        </Row>
        )
        
    }
}