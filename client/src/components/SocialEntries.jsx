import React, { Component } from 'react'
import { client } from '../client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Loader from '../Loader.svg'
import { FETCH_ENTRIES } from '../queries'
import FilterNav from './FilterNav'

export default class SocialEntries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      loading: true,
      endFetch: false,
      pageInfo: { first: 5, offset: 0, query: 'All' }
    }
    this.scrolledDown = false
  }

  trackScrolling = event => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.state.endFetch &&
      this.scrolledDown
    ) {
      const pageInfo = {
        ...this.state.pageInfo,
        offset: this.state.pageInfo.first + this.state.pageInfo.offset
      }
      this.setState({ loading: true })
      this.scrolledDown = false
      this.fetchEntries(pageInfo)
    }
  }

  componentDidMount() {
    this.fetchEntries(this.state.pageInfo)
    document.addEventListener('scroll', this.trackScrolling)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling)
  }

  fetchEntries = async (pageInfo, isFiltering) => {
    const { first, offset, query } = pageInfo
    const { loading, data } = await client.query({
      query: FETCH_ENTRIES,
      variables: { first, offset, query }
    })
    this.setState(prevState => ({
      entries: isFiltering
        ? data.getEntries
        : [...prevState.entries, ...data.getEntries],
      loading,
      endFetch: data.getEntries.length < 5,
      pageInfo
    }))
    this.scrolledDown = true
  }

  handleFilter = event => {
    const pageInfo = { ...this.state.pageInfo, offset: 0, query: event.target.innerText }
    const isFiltering = true
    this.setState({ loading: true })
    this.fetchEntries(pageInfo, isFiltering)
  }

  render() {
    const { entries, loading, pageInfo } = this.state
    return (
      <Container>
        <FilterNav handleFilter={this.handleFilter} pageInfo={pageInfo} />
        <Row>
          <Col lg={2} />
          <Col lg={8}>
            {entries.map((entry, index) => (
              <Card key={index}>
                <Card.Img variant="top" src={entry.thumbnail} />
                <Card.Body>
                  <Card.Title>{entry.title}</Card.Title>
                  <Card.Text>{entry.description}</Card.Text>
                </Card.Body>
              </Card>
            ))}
            {loading && (
              <div className="text-center">
                <img alt="loader" src={Loader} />
              </div>
            )}
          </Col>
          <Col lg={2} />
        </Row>
      </Container>
    )
  }
}
