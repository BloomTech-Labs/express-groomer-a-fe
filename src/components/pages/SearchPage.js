import React, { useEffect, useContext } from 'react';
import { SearchResults } from '../search/SearchResults/SearchResultsCard';
// import NoResults from '../search/SearchResults/NoResults';
import 'antd/dist/antd.css';
import '../../styles/search.scss';
import { Button, Col, Input, Row } from 'antd';
// context imports
import { GroomersContext } from '../../state/contexts/GroomersContext';
import { APIContext } from '../../state/contexts/APIContext';
import { FormContext } from '../../state/contexts/FormContext';
import { useHistory } from 'react-router-dom';
import FadeIn from 'react-fade-in';

const { Search } = Input;

const SearchPage = () => {
  const history = useHistory();
  //context state
  const { allGroomers, filteredGroomers, setFilteredGroomers } = useContext(
    GroomersContext
  );
  const { searchValue, setSearchValue } = useContext(FormContext);
  const { getGroomers } = useContext(APIContext);

  //API Call
  useEffect(() => {
    getGroomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = event => {
    setSearchValue(event.target.value);
  };

  const onSearch = () => {
    const result = allGroomers.filter(groomer =>
      groomer.city.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredGroomers(result);
  };

  return (
    <div className="search-page-container">
      <FadeIn delay={100} transitionDuration={550}>
        <div className="search-bar-container">
          <Search
            className="search-input"
            value={searchValue}
            onSearch={onSearch}
            onChange={handleChange}
            enterButton
            placeholder="Search By City Name"
            style={{ width: 500 }}
          />
        </div>
        <Row justify={'center'} style={{ marginTop: '20px' }}>
          <Col>-- OR --</Col>
        </Row>
        <Row justify={'center'} className={'map-button'}>
          <Col>
            <Button
              type={'primary'}
              onClick={() => history.push('/groomer-map')}
            >
              View The Map
            </Button>
          </Col>
        </Row>
        <div className="card-container">
          {filteredGroomers.length > 0 ? (
            filteredGroomers.map((groomer, index) => {
              return <SearchResults key={index} groomer={groomer} />;
            })
          ) : (
            // <NoResults />
            <div></div>
          )}
        </div>
      </FadeIn>
    </div>
  );
};

export default SearchPage;
