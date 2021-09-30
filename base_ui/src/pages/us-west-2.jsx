import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

// const ComponentName = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>
const USWest2 = props => {
    const { data } = props
    const edges = data.allInstanceByAzJson.edges
    const null_query = ""

    console.log(edges)

    const [state, setState] = useState({
        instance_type: null_query,
        az: null_query,
        filteredData: edges
    })

    const handleInputChange = event => {
        // console.log(event.target.name, event.target.value)
        const target = event.target
        const value = target.value
        const name = target.name

        setState({
            ...state,
            [name]: value
        })
    }

    useEffect(() => {
        var localState = state
        const filteredData = edges.filter(edge => {
            const db_az = edge.node.az
            const az = (db_az.toLowerCase().includes(localState["az"].toLowerCase())) ? true : false

            const db_it = edge.node.instance_type
            const it = (db_it.toLowerCase().includes(localState["instance_type"].toLowerCase())) ? true : false

            return (az == true && it == true) ? true : false
        })

        setState({
            ...state,
            filteredData: filteredData
        })
    }, [state.az, state.instance_type])

    var display_data
    display_data = state.filteredData.map(edge =>
        <tr key={edge.node.id}>
            <td>{edge.node.instance_type}</td>
            <td>{edge.node.az}</td>
        </tr>
    )

    return(
        <Layout pageInfo={{ pageName: "us-west-2" }}>
            <Container>
                <Row><Col><h1><center>us-west-2</center></h1></Col></Row>
                <Row><Col>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <td>Instance Type<br /><input type="text" name="instance_type" onChange={handleInputChange} /></td>
                            <td>Availability Zone<br /><input type="text" name="az" onChange={handleInputChange} /></td>
                        </tr>
                    </thead>
                    <tbody>
                        {display_data}
                    </tbody>
                </Table>
                </Col></Row>
            </Container>
        </Layout>
    )
}

export const query = graphql`
  {
    allInstanceByAzJson(filter: {region: {eq: "us-west-2"}}) {
      edges {
        node {
            id
            az
            instance_type
        }
      }
    }
  }
`

export default USWest2