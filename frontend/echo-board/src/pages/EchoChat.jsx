// import React, { useState, useEffect, useRef } from 'react';
// import Navbar from '../components/Navbar';
// import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:5000'); 

// function EchoChat() {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(scrollToBottom, [messages]);

//   useEffect(() => {
//     socket.on('receive_message', (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => socket.off('receive_message');
//   }, []);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     const msgObj = { text: message, id: Date.now() };
//     socket.emit('send_message', msgObj);
//     setMessages((prev) => [...prev, msgObj]);
//     setMessage('');
//   };

//   return (
//     <div className="min-h-screen bg-[#0d1117] kode-mono-fontStyle text-white">
//       <Navbar />

//       <div className="max-w-3xl mx-auto p-6 flex flex-col h-[calc(100vh-80px)]">

//         <h2 className="text-2xl font-bold mb-4">EchoChat</h2>

//         <div
//           className="flex-1 rounded-xl p-4 overflow-y-auto mb-4
//           border border-white/10 bg-white/5 backdrop-blur-lg shadow"
//         >
//           {messages.length === 0 ? (
//             <p className="text-gray-400 text-center mt-8">
//               No messages yet. Start chatting!
//             </p>
//           ) : (
//             messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className="p-3 rounded-lg mb-2 max-w-xs 
//                 bg-white/10 border border-white/10 text-gray-200"
//               >
//                 {msg.text}
//               </div>
//             ))
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         <form onSubmit={handleSend} className="flex items-center space-x-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 px-4 py-2 rounded-xl
//             bg-transparent border border-white/20 text-white
//             placeholder-gray-400 focus:outline-none
//             focus:ring-1 focus:ring-cyan-500"
//           />
//           <button
//             type="submit"
//             className="bg-cyan-900 hover:bg-cyan-800 text-white 
//             px-4 py-2 rounded-xl transition shadow-md"
//           >
//             <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EchoChat;
