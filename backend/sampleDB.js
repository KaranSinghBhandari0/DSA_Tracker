require('dotenv').config();
const mongoose = require("mongoose");
const Question = require("./models/question");

const questions = [
    {
        title: "Two Sum",
        topic: "Arrays",
        link: "https://leetcode.com/problems/two-sum/",
        notes: "Classic hash map approach for O(n) solution.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Set Matrix Zeroes",
        topic: "2D Arrays",
        link: "https://leetcode.com/problems/set-matrix-zeroes/",
        notes: "Use constant space by marking first row & column.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Longest Palindromic Substring",
        topic: "String",
        link: "https://leetcode.com/problems/longest-palindromic-substring/",
        notes: "Expand around center technique.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Search in Rotated Sorted Array",
        topic: "Binary Search",
        link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        notes: "Modified binary search with pivot point.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Merge Sort",
        topic: "Sorting",
        link: "https://leetcode.com/problems/sort-an-array/",
        notes: "Divide and conquer approach.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Subsets II",
        topic: "Recursion & Backtracking",
        link: "https://leetcode.com/problems/subsets-ii/",
        notes: "Backtracking with duplicate handling.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Reverse Linked List",
        topic: "Linked List",
        link: "https://leetcode.com/problems/reverse-linked-list/",
        notes: "Iterative and recursive solutions.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Largest Rectangle in Histogram",
        topic: "Stack & Queue",
        link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
        notes: "Use stack to keep track of heights.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Sliding Window Maximum",
        topic: "Sliding Window",
        link: "https://leetcode.com/problems/sliding-window-maximum/",
        notes: "Use deque to maintain max efficiently.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Top K Frequent Elements",
        topic: "Hashing",
        link: "https://leetcode.com/problems/top-k-frequent-elements/",
        notes: "Use a hash map and a min heap.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Job Sequencing Problem",
        topic: "Greedy Algo",
        link: "https://leetcode.com/problems/maximum-performance-of-a-team/",
        notes: "Sort jobs by deadline and maximize profit.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Diameter of Binary Tree",
        topic: "Binary Tree",
        link: "https://leetcode.com/problems/diameter-of-binary-tree/",
        notes: "Use DFS to find max depth from each node.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Validate Binary Search Tree",
        topic: "BST",
        link: "https://leetcode.com/problems/validate-binary-search-tree/",
        notes: "Use inorder traversal for validation.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Find Median from Data Stream",
        topic: "Heaps",
        link: "https://leetcode.com/problems/find-median-from-data-stream/",
        notes: "Maintain two heaps to balance elements.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Course Schedule",
        topic: "Graphs",
        link: "https://leetcode.com/problems/course-schedule/",
        notes: "Topological sorting with BFS (Kahn's Algorithm).",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Longest Increasing Subsequence",
        topic: "Dynamic Programming",
        link: "https://leetcode.com/problems/longest-increasing-subsequence/",
        notes: "Binary search + DP for O(n log n) approach.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Single Number",
        topic: "Bit Manipulation",
        link: "https://leetcode.com/problems/single-number/",
        notes: "Use XOR to cancel out duplicate numbers.",
        user: "67a2552856d3697f9f46fc61",
    },
    {
        title: "Implement Trie (Prefix Tree)",
        topic: "Trie",
        link: "https://leetcode.com/problems/implement-trie-prefix-tree/",
        notes: "Standard trie implementation.",
        user: "67a2552856d3697f9f46fc61",
    },
];

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        console.log("Connected to MongoDB");
        await Question.insertMany(questions);
        console.log("Sample questions added!");
    })
    .catch((err) => console.error("MongoDB Connection Error:", err))
    .finally(async () => {
        await mongoose.disconnect();
        console.log("MongoDB connection closed.");
    });