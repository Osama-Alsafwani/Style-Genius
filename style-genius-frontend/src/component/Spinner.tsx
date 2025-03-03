export default function Spinner() {
  return (
    <div className="flex justify-center p-8">
      <div
        className="w-8 h-8 border-4 border-purple-500 rounded-full animate-spin"
        style={{ borderTopColor: "transparent" }}
      />
    </div>
  );
}
