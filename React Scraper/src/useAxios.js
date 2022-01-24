import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useAxios = ({size, page, name}) => {
    const [response, setResponse] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios
            .get(`/media-scraping?size=${size}&page=${page}&name=${name}`)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [size, page, name]);

    // custom hook returns value
    return { response, error, loading };
};

export default useAxios;