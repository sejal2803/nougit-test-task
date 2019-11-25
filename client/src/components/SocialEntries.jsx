import React, { Component } from 'react'
import { client } from '../client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Image from 'react-bootstrap/Image'
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
    const pageInfo = {
      ...this.state.pageInfo,
      offset: 0,
      query: event.target.innerText
    }
    const isFiltering = true
    this.setState({ loading: true })
    this.fetchEntries(pageInfo, isFiltering)
  }

  renderBadge(entry) {
    let variant, name
    if (entry.isTrending) {
      variant = 'danger'
      name = 'Trending'
    } else if (!!entry.status) {
      variant = 'info'
      name = 'Task Pending'
    } else {
      variant = 'success'
      name = 'Task Completed'
    }

    return (
      <Badge pill variant={variant} className="float-right mt-3 p-2">
        {name}
      </Badge>
    )
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
              <Card key={index} className="shadow mb-3">
                <Card.Body>
                  <div>
                    <Image
                      src={entry.author.picture}
                      className="m-2"
                      roundedCircle
                      height="60px"
                      width="60px"
                    />
                    <span className="m-2">{entry.author.name}</span>
                    {this.renderBadge(entry)}
                  </div>
                  <div className="pt-4 pb-5">
                    <Card.Title>{entry.title}</Card.Title>
                    <Card.Text>{entry.description}</Card.Text>
                  </div>
                  <div>
                    <Row className="pb-3">
                      <Col lg={6}>
                        <Image
                          src={entry.thumbnail}
                          className="thumbnail-image"
                        />
                      </Col>
                      <Col lg={6}>
                        <p className="pt-5 text-currency mb-0">$5000</p>
                        <p className="text-muted">
                          pledged of ${entry.pledgeGoal} goal
                        </p>
                        <div className="text-muted">
                          {entry.pledgerCount}
                          <Badge
                            pill
                            variant="info"
                            className="float-right py-2 px-3"
                          >
                            Pledge
                          </Badge>
                        </div>
                        <p className="text-muted">pledgers</p>
                      </Col>
                    </Row>
                    <div>
                      <span className="p-2">View Source</span>
                      <span className="p-2">
                        Code Submissions({entry.codeSubmissionTotal})
                      </span>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <span className="p-2">Comments({entry.numComments})</span>
                  <span className="p-2">Share</span>
                </Card.Footer>
              </Card>
            ))}
            {loading && (
              <div className="text-center">
                <Image alt="loader" src={Loader} />
              </div>
            )}
          </Col>
          <Col lg={2} />
        </Row>
      </Container>
    )
  }
}
