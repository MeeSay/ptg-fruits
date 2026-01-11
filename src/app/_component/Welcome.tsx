export default function Welcome() {
  return (
    <div className="h-full w-50 p-6 bg-black shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-200 mb-4">
        Chào mừng bạn đến với PTG Fruit!
      </h1>
      <p className="text-white text-xl">Hướng dẫn đăng tin:</p>
      <ol className="list-decimal list-inside text-gray-400 space-y-2">
        <li>Chọn loại trái cây bạn muốn đăng tin.</li>
        <li>Nhập thông tin chi tiết về trái cây và biến thể.</li>
        <li>Nhập tên người chơi trong game.</li>
        <li>Kiểm tra lại thông tin và gửi tin đăng.</li>
      </ol>
    </div>
  );
}
