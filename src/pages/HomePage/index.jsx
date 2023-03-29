import SearchBar from '../../components/SearchBar/index';
import SearchProducts from '../../components/SearchProducts/index';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Home | Tabernia';
    }, []);

    return (
        <div id='main'>
            <h2 className='text-center mb-4'>Products</h2>
            <SearchBar />
            <SearchProducts />
        </div>
    );
}

export default Home;
