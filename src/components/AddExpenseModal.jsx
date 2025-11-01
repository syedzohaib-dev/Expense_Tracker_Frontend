import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";



const AddExpenseModal = ({ onClose, onSubmit }) => {
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [emoji, setEmoji] = useState("");
    const [date, setDate] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !amount || !date) return alert("Please fill all fields");

        const newExpense = {
            category,
            amount: Number(amount),
            icon: emoji,
            date,
        };
        onSubmit(newExpense);
    };

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Add New Expense</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Source</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="e.g. Salary, Freelance"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Emoji</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100"
                            >
                                {emoji || "🚫"}
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute mt-2 z-50">
                                    <EmojiPicker
                                        onEmojiClick={(emojiData) => {
                                            setEmoji(emojiData.emoji);
                                            setShowEmojiPicker(false);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;
