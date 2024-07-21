import { useContext } from 'react';
import queryString from 'query-string';
import { useHttpClient } from '../hooks/useHttpClient'; // Điều chỉnh đường dẫn nếu cần
import { SearchContext } from '../contexts/search'; // Điều chỉnh đường dẫn nếu cần
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../routes/api.path';
const useSearch = () => {
  const { setSearchValue, setSearchResults } = useContext(SearchContext);

  const { sendReq } = useHttpClient();
  const navigate = useNavigate(); //

  const search = async (value) => {
    if (value) {
      setSearchValue(value);
      try {
        const data = await list({ search: value || undefined });
        setSearchResults(data);
        navigate(`/search/?query=${value}`);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResults([]);
    }
  };

  const list = async (params) => {
    const query = queryString.stringify(params);
    try {
      const responseData = await sendReq(
        `${ENDPOINTS.getPosts}/search?${query}`
      );
      return responseData.posts;
    } catch (err) {
      console.log(err);
    }
  };

  return { search };
};

export default useSearch;
