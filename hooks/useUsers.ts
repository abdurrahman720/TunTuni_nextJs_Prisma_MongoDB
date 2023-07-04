import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useUsers = () => {
    const { data, error } = useSWR('/api/users', fetcher);

    return {
        data, error
    }
};

export default useUsers;