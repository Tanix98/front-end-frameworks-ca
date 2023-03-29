import useApi from '../../api/useApi/index';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, createContext } from 'react';

export const SearchContext = createContext();

function SearchBar() {
    const { data } = useApi('https://api.noroff.dev/api/v1/online-shop');

    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            search();
        }
    }

    function onTextInputChange(event) {
        const value = event.target.value;
        setSearchTerm(value);
    }

    function search() {
        //if (searchTerm.replace(/ /g, '') === '') return;
        console.log('searchbar searchterm: ' + searchTerm);
        console.log(filteredData);
    }

    return (
        <SearchContext.Provider value={{ searchTerm }}>
            <Container className='mb-1'>
                <Row className='d-flex justify-content-center'>
                    <Col xs={12} sm={6} md={4}>
                        <Form className='d-flex'>
                            <Form.Control
                                type='search'
                                placeholder='Search'
                                aria-label='Search'
                                value={searchTerm}
                                onChange={onTextInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <Button variant='dark' onClick={search}>
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </SearchContext.Provider>
    );
}

export default SearchBar;
