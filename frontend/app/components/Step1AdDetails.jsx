export default function Step1AdDetails({ data, onChange }) {
  return (
    <div className="space-y-4 bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
      <h2 className="text-xl font-semibold text-[#ff3399]">
        📝 Ad Details / දැන්වීම් විස්තර
      </h2>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Ad Title / දැන්වීම් මාතෘකාව <span className="text-red-500">*</span>
        </label>
        <input
          name="title"
          value={data.title}
          onChange={onChange}
          placeholder="Enter ad title"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Description / විස්තරය <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={data.description}
          onChange={onChange}
          rows={4}
          placeholder="Describe your ad"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Location / ස්ථානය (Optional)
        </label>
        <input
          name="location"
          value={data.location}
          onChange={onChange}
          placeholder="Enter location"
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Upload Image / රූපය උඩුගත කරන්න{' '}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={onChange}
          className="w-full px-4 py-2 bg-[#0d0d0d] text-white rounded border border-pink-500 focus:outline-none"
          required
        />
        {data.image && (
          <p className="text-sm text-green-400 mt-1">
            ✅ Image selected: {data.image.name}
          </p>
        )}
      </div>
    </div>
  );
}