
const FollowBar = () => {

    return (
        <div className="px-6 py-4 hidden lg:block">
            <div className="bg-neutral-800 rounded-xl p-4">
                <h2 className="text-orange-600 text-xl font-semibold">Who to Follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                    <p>user 1</p>
                    <p>user 1</p>
                    <p>user 1</p>
                </div>
            </div>
        </div>
    );
};

export default FollowBar;