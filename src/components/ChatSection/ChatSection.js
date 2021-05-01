export default function ChatSection({ messages }) {
  return messages.map((message) => <li>{message.text}</li>);
}
