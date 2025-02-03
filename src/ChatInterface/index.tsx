import { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');

  const handleSend = async () => {
    if (!prompt.trim()) return;

    try {
      // API call to DeepSeek
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-llama-8b-instruct',
          messages: [
            { role: 'user', content: prompt }
          ]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error. Please try again.'
}]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">DeepSeek R1 Distill Llama 8B Chat</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
              <p className="bg-blue-100 text-blue-800 p-3 rounded-lg">{message.content}</p>
            </div>
          ))}
          <div className="flex space-x-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;