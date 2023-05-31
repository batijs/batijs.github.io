export default function Bric(props: { word: string }) {
  // shadow: #de624e
  // bg: #ec7259
  // parent-bg: #cd4e41
  return <div class="inline-block bg-[#ec7259] text-white p-1.5 rounded-sm relative border-l-8 border-l-[#de624e] shadow">
    {' ' + props.word}
  </div>;
}