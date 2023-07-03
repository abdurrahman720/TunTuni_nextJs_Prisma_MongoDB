import { ClipLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-full'>
        <ClipLoader color="orange" size={80} />
    </div>
    );
};

export default Loader;