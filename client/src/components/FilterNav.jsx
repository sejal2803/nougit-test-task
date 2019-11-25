import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export default function FilterNav({ handleFilter, pageInfo }) {
  return (
    <div className="display-nav">
      <span className="m-3">Filter By:</span>
      <span>
        <ButtonToolbar>
          <Button
            onClick={handleFilter}
            className="m-3"
            variant={pageInfo.query === 'All' ? 'dark' : 'secondary'}
            size="sm"
          >
            All
          </Button>
          <Button
            onClick={handleFilter}
            className="m-3"
            variant={pageInfo.query === 'Trending' ? 'dark' : 'secondary'}
            size="sm"
          >
            Trending
          </Button>
          <Button
            onClick={handleFilter}
            className="m-3"
            variant={pageInfo.query === 'Open Tasks' ? 'dark' : 'secondary'}
            size="sm"
          >
            Open Tasks
          </Button>
          <Button
            onClick={handleFilter}
            className="m-3"
            variant={
              pageInfo.query === 'Completed Tasks' ? 'dark' : 'secondary'
            }
            size="sm"
          >
            Completed Tasks
          </Button>
        </ButtonToolbar>
      </span>
    </div>
  )
}
