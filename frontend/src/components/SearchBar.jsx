import { Search } from "lucide-react";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const SearchBar = () => {
    const { search } = useContext(AppContext);
    const [query, setQuery] = useState("");

    // Handles real-time query updates
    const handleQueryChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        search(newQuery);
    };

    // Handles form submission
    const handleSearch = (e) => {
        e.preventDefault();
        search(query);
    };

    return (
        <div className="w-full max-w-lg mx-auto px-3">
            <form
                onSubmit={handleSearch}
                className="flex w-full p-2 border border-gray-300 rounded-lg shadow-md bg-white focus-within:ring-2 focus-within:ring-blue-500"
            >
                <input
                    type="text"
                    value={query}
                    onChange={handleQueryChange} // Updates query in real-time
                    placeholder="Search..."
                    className="w-full px-4 py-2 text-gray-700 focus:outline-none"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    <Search size={20} />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;