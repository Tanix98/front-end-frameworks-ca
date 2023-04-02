import './styles.css';
import useApi from '../../api/useApi/index';
import RenderProducts from '../../components/RenderProducts/index';
import { useEffect, useState, createContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

export const SearchContext = createContext();

function Home() {
    useEffect(() => {
        document.title = 'Store | Tabernia';
    }, []);

    const { data } = useApi('https://api.noroff.dev/api/v1/online-shop');

    // searchbar

    const [filteredData, setFilteredData] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    /*const [focused, setFocused] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);*/

    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            search();
        }
    }

    function handleFilter(event) {
        const searchWord = event.target.value;
        const newFilter = data.filter((product) => {
            return product.title
                .toLowerCase()
                .includes(searchWord.toLowerCase());
        });
        if (searchWord.replace(/ /g, '') === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        setSearchWord(searchWord);
    }

    function search() {
        setSearchTerm(searchWord);
    }

    return (
        <div id='main'>
            <div className='mb-2 d-flex justify-content-center position-relative'>
                <Col xs={12} sm={6} md={4}>
                    <Form className='d-flex'>
                        <Form.Control
                            type='search'
                            placeholder='Search'
                            aria-label='Search'
                            value={searchWord}
                            onChange={handleFilter}
                            onKeyDown={handleKeyDown}
                            /*onFocus={onFocus}
                            onBlur={onBlur}*/
                        />
                        <Button variant='dark' onClick={search}>
                            Search
                        </Button>
                    </Form>
                </Col>
                {filteredData.length > 0 && (
                    <Col
                        xs={12}
                        sm={6}
                        md={4}
                        id='search-results'
                        className='bg-white border position-absolute'
                    >
                        <div id='search-list'>
                            {filteredData.map((value, key) => {
                                return (
                                    <Link
                                        to={{
                                            pathname: `/product/${value.id}`,
                                        }}
                                        className='search-list-item text-decoration-none text-dark d-block p-2'
                                        target='_blank'
                                        key={key}
                                    >
                                        {value.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </Col>
                )}
            </div>
            <SearchContext.Provider value={{ searchTerm }}>
                <RenderProducts />
            </SearchContext.Provider>
        </div>
    );
}

export default Home;
