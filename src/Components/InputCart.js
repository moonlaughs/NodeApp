import React, { Component } from "react";

import{
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import Node from './Node';

export default class InputCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            nodes: [],
            nodeId: 0,
            nodeName: '',
            nodepairs: [],
            parentNode: '',
            childNode: ''
        };
        this.saveChanges = this.saveChanges.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.showChildren = this.showChildren.bind(this);
    }

    componentDidMount() {
        fetch(`https://localhost:5001/api/nodes/`)
            .then(response => response.json())
            .then(data => this.setState({ nodes: data }));
            
    }

    handleDoubleClick(myId, myName){
        
        this.state.nodeId = myId;
        this.state.nodeName = myName;

        var myElement = document.createElement("input")
        myElement.setAttribute("id", "inputChange");

        var myButtonSaveChanges = document.createElement("BUTTON");
        myButtonSaveChanges.innerText = "Save Changes";
        myButtonSaveChanges.setAttribute("id", "saveChangesButton")
        myButtonSaveChanges.onclick = this.saveChanges

        var removeButton = document.createElement("BUTTON");
        removeButton.innerText = "Remove";
        removeButton.setAttribute("id", "removeButton")
        removeButton.onclick = this.removeNode
        
        var showChildrenButton = document.createElement("BUTTON");
        showChildrenButton.innerText = "Show Children";
        showChildrenButton.setAttribute("id", "showChildrenButton")
        showChildrenButton.onclick = this.showChildren

        document.getElementById(myId).appendChild(myElement)
        document.getElementById(myId).appendChild(myButtonSaveChanges);
        document.getElementById(myId).appendChild(removeButton);
        document.getElementById(myId).appendChild(showChildrenButton);
        document.getElementById("inputChange").value = myName;
    }

    showChildren(event){
        try{

        } catch (error){
            console.log(error);
        }
        fetch(`https://localhost:5001/api/nodepairs/` + this.state.nodeId)
            .then(response => response.json())
            .then(data => this.setState({ nodepairs: data }));
            var {nodepairs} = this.state
            nodepairs.forEach(element => {
                console.log(element)
                var child = document.createElement("p")
                child.setAttribute("id", element)
                child.value = element.childId
                document.getElementById("myP").appendChild(child)
            });
            event.preventDefault();
        
    }

    removeNode(event){
        fetch('https://localhost:5001/api/nodes/' + this.state.nodeId, {
                method: 'DELETE'
                })
                .then(res => res.json())
                .then(res => console.log(res))
    }

    saveChanges(event){
        const formBody = {
                    nodeId: this.state.nodeId,
                    nodeName: document.getElementById("inputChange").value
                }
        fetch('https://localhost:5001/api/nodes/' + this.state.nodeId, {
                method: 'PUT',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(formBody)
                })
                .then(res => res.json())
                .then(res => console.log(res))
    }

    addNode(){
        const newBody = {
            nodeName: document.getElementById("newNodeName").value
        }

        fetch('https://localhost:5001/api/nodes/', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify(newBody)
            })
            .then(res => res.json())
            .then(res => console.log(res))

            window.location.reload();
    }

    GetChildrenNodes(myParentId){
        fetch(`https://localhost:5001/api/nodepairs/` + myParentId)
        .then(response => response.json())
        .then(data => this.setState({ nodepairs: data }));
    }

    render() {

        var {nodes} = this.state;

        const NodeField = ({nodeId, nodeName}) => <Row>
        <Col>{nodeId}</Col>
        <Col id={nodeId} onDoubleClick={() => this.handleDoubleClick(nodeId, nodeName)}>{nodeName}</Col>
        
    </Row>

        return (
            <form>
                <Container>
                    {nodes.map(item => (
                        <Container>
                        <NodeField nodeId={item.nodeId} nodeName={item.nodeName}></NodeField>
                        
                        </Container>
                    ))}

                    <input id="newNodeName"></input>
                    <Button variant="primary" id="addButton" onClick={this.addNode}>Add new Node</Button>{' '}
                    <p id="myP"></p>
                </Container>
            </form>
        )

        
    }
}