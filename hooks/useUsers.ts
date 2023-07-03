import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

const useUsers = () => {
    const { data, error } = useSWR('/api/users', fetcher, { revalidateOnMount: true });

    return {
        data, error
    }
};

export default useUsers;