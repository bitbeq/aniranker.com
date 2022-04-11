import TableElement from "../../components/leaderboard/TableElement";
import PageButton from "../../components/leaderboard/PageButton";
import PageButtonTop from "../../components/leaderboard/PageButtonTop";

function LeaderboardPage(data) {

    return (
        <>
        <div className="text-center mb-5 bg-white py-4 rounded-lg shadow-md mx-12">
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-gray-600 text-sm">Last updated at 5:00PM EST on April 9th, 2022.</p>
            <div className="flex justify-center mt-3">
                <button className="bg-indigo-500 p-2 rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-700 duration-300">
                    <a className="text-white text-md font-semibold" href="/">Back to Select</a>
                </button>
            </div>
        </div>
        <div className="mx-12 mb-5 bg-white py-2 rounded-lg shadow-lg">
            <PageButtonTop 
            startIndex={(parseInt(data.next.page - 2) * 25) + 1 + 0} 
            endIndex={(parseInt(data.next.page - 2) * 25) + 1 + 24} 
            numberOfChars={data.meta.total_count} 
            pages={data.meta.page_count} 
            current={data.meta.current_page} />
        </div>
        <div className="bg-white mx-12 mb-20 rounded-lg shadow-lg">

            <div className="flex justify-center">
                <table className="table-fixed w-full text-center">
                    <thead className="border-b-2 border-gray-200">
                        <tr>
                            <th>Rank</th>
                            <th>Character</th>
                            <th>Anime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.result.map((item, i) => (
                            <TableElement 
                            name={item.name} 
                            anime={item.anime} 
                            src={`/images/${item.picture_id}.jpg`} 
                            rank={(parseInt(data.next.page - 2) * 25) + 1 + i}
                            rating={item.rating} 
                            bg_color={i % 2 == 0 ? "bg-gray-100" : "bg-gray-200"} />
                        ))}
                    </tbody>
                </table>
            </div>
            <PageButton 
            startIndex={(parseInt(data.next.page - 2) * 25) + 1 + 0} 
            endIndex={(parseInt(data.next.page - 2) * 25) + 1 + 24} 
            numberOfChars={data.meta.total_count} 
            pages={data.meta.page_count} 
            current={data.meta.current_page} />
        </div>
        </>
    )
}

LeaderboardPage.getInitialProps = async (ctx) => {
    const { page } = ctx.query;

    const res = await fetch(`http://localhost:3001/leaderboard?page=${page}`);
    const json = await res.json();

    return json;

}

export default LeaderboardPage;